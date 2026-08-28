import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const indexSource = readFileSync(resolve(root, "src/index.ts"), "utf8");
const producerSource = readFileSync(resolve(root, "src/queue/producer.ts"), "utf8");
const consumerSource = readFileSync(resolve(root, "src/queue/consumer.ts"), "utf8");
const orchestratorSource = readFileSync(resolve(root, "src/memory/dream/orchestrator.ts"), "utf8");
const wrangler = readFileSync(resolve(root, "wrangler.toml"), "utf8");

assert.match(indexSource, /enqueueDreamMaintenance\(env, namespace, getDailyDigestMaxRuns\(env\)\)/);
assert.match(indexSource, /if \(queued\) \{[\s\S]*?return;[\s\S]*?Local\/no-Queue fallback/);
assert.match(producerSource, /type: "dream_maintenance"/);
assert.match(producerSource, /stage: "dream_primary"/);

for (const stage of [
  "dream_primary",
  "dream_backfill",
  "diary",
  "retention_github",
  "weekly",
  "monthly"
]) {
  assert.match(consumerSource, new RegExp(`case "${stage}"`));
}

assert.match(consumerSource, /runDailyMemoryDigest\(env, namespace/);
assert.match(consumerSource, /maxAttempts: 1/);
assert.match(consumerSource, /excludeDateLabels: skippedDates/);
assert.match(orchestratorSource, /if \(attempts >= maxAttempts\) break/);
assert.match(wrangler, /\[\[queues\.consumers\]\][\s\S]*?max_batch_size = 1/);

console.log("dream subrequest budget relay verification passed");
