import { runMemoryRetention } from "../memory/retention";
import { runDailyMemoryDigest, runDreamBackfill } from "../memory/dailyDigest";
import {
  runDiaryTrigger,
  runGithubDailyTrigger,
  runMonthlyRollupTrigger,
  runWeeklyRollupTrigger
} from "../memory/dream/rollupPhase";
import type { DreamMaintenanceQueueMessage, Env, QueueMessage } from "../types";

const MODEL_UNAVAILABLE_REASONS = new Set(["missing_model", "model_error", "extract_model_error"]);

function positiveInt(value: number | undefined, fallback: number): number {
  if (!Number.isFinite(value)) return fallback;
  return Math.max(1, Math.floor(value as number));
}

async function relayDreamMaintenance(
  env: Env,
  current: DreamMaintenanceQueueMessage,
  next: Omit<DreamMaintenanceQueueMessage, "type" | "namespace">
): Promise<void> {
  if (!env.MEMORY_QUEUE) {
    throw new Error("dream maintenance relay requires MEMORY_QUEUE");
  }
  await env.MEMORY_QUEUE.send({
    type: "dream_maintenance",
    namespace: current.namespace,
    ...next
  });
}

function isModelUnavailable(result: Awaited<ReturnType<typeof runDailyMemoryDigest>>): boolean {
  return !result.ran && MODEL_UNAVAILABLE_REASONS.has(result.reason);
}

async function handleDreamMaintenance(message: DreamMaintenanceQueueMessage, env: Env): Promise<void> {
  const namespace = message.namespace;

  switch (message.stage) {
    case "dream_primary": {
      const remainingRuns = positiveInt(message.remaining_runs, 1);
      const result = await runDailyMemoryDigest(env, namespace, {
        dateLabel: message.date_label,
        trigger: "cron"
      });
      console.log("queued dream primary batch", { namespace, remainingRuns, result });

      if (isModelUnavailable(result)) {
        await relayDreamMaintenance(env, message, { stage: "diary" });
        return;
      }
      if (result.ran && result.stats.hasMore && remainingRuns > 1) {
        await relayDreamMaintenance(env, message, {
          stage: "dream_primary",
          date_label: result.stats.date,
          remaining_runs: remainingRuns - 1,
          remaining_backfill_dates: message.remaining_backfill_dates,
          skipped_backfill_dates: message.skipped_backfill_dates
        });
        return;
      }

      await relayDreamMaintenance(env, message, {
        stage: "dream_backfill",
        remaining_backfill_dates: positiveInt(message.remaining_backfill_dates, 2),
        skipped_backfill_dates: message.skipped_backfill_dates ?? []
      });
      return;
    }

    case "dream_backfill": {
      const remainingDates = positiveInt(message.remaining_backfill_dates, 1);
      const skippedDates = message.skipped_backfill_dates ?? [];
      const backfill = await runDreamBackfill(env, namespace, {
        maxDates: 1,
        lookback: 3,
        maxAttempts: 1,
        excludeDateLabels: skippedDates
      });
      const item = backfill[0];
      console.log("queued dream backfill batch", { namespace, remainingDates, item: item ?? null });

      if (!item || isModelUnavailable(item.result)) {
        await relayDreamMaintenance(env, message, { stage: "diary" });
        return;
      }

      const nextSkippedDates = [...new Set([...skippedDates, item.dateLabel])];
      if (remainingDates > 1) {
        await relayDreamMaintenance(env, message, {
          stage: "dream_backfill",
          remaining_backfill_dates: remainingDates - 1,
          skipped_backfill_dates: nextSkippedDates
        });
        return;
      }
      await relayDreamMaintenance(env, message, { stage: "diary" });
      return;
    }

    case "diary":
      try {
        await runDiaryTrigger(env, namespace);
      } catch (error) {
        console.error("queued diary writer failed", { namespace, error: String(error) });
      }
      await relayDreamMaintenance(env, message, { stage: "retention_github" });
      return;

    case "retention_github":
      await Promise.all([
        runMemoryRetention(env, namespace).catch((error) => {
          console.error("queued memory retention failed", { namespace, error: String(error) });
        }),
        runGithubDailyTrigger(env).catch((error) => {
          console.error("queued github daily pull failed", { namespace, error: String(error) });
        })
      ]);
      await relayDreamMaintenance(env, message, { stage: "weekly" });
      return;

    case "weekly":
      try {
        await runWeeklyRollupTrigger(env, namespace);
      } catch (error) {
        console.error("queued weekly rollup failed", { namespace, error: String(error) });
      }
      await relayDreamMaintenance(env, message, { stage: "monthly" });
      return;

    case "monthly":
      try {
        await runMonthlyRollupTrigger(env, namespace);
      } catch (error) {
        console.error("queued monthly rollup failed", { namespace, error: String(error) });
      }
      console.log("queued memory maintenance complete", { namespace });
      return;
  }
}

export async function handleQueueMessage(message: QueueMessage, env: Env): Promise<void> {
  switch (message.type) {
    case "retention":
      await runMemoryRetention(env, message.namespace);
      return;
    case "dream_maintenance":
      await handleDreamMaintenance(message, env);
      return;
    default:
      console.warn("queue: unknown message type", (message as { type?: string }).type);
  }
}
