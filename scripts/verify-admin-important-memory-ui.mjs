import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const [source, memoriesApi, dreamApi, dreamExtract, indexSource] = await Promise.all([
  readFile(new URL("../src/api/admin/ui.ts", import.meta.url), "utf8"),
  readFile(new URL("../src/api/memories.ts", import.meta.url), "utf8"),
  readFile(new URL("../src/api/dream.ts", import.meta.url), "utf8"),
  readFile(new URL("../src/memory/dream/extractPhase.ts", import.meta.url), "utf8"),
  readFile(new URL("../src/index.ts", import.meta.url), "utf8"),
]);
const marker = "<script>\nfunction memoryAdmin()";
const start = source.lastIndexOf(marker);
const end = source.lastIndexOf("</script>");
assert.ok(start >= 0 && end > start, "memoryAdmin script block must exist");

const script = source.slice(start + "<script>\n".length, end);
const sandbox = {
  localStorage: { getItem: () => null, setItem: () => {} },
  location: { origin: "https://example.invalid", href: "" },
  window: { setTimeout: () => 0, confirm: () => true },
  TextEncoder,
  crypto: globalThis.crypto,
  console,
};
vm.createContext(sandbox);
vm.runInContext(script, sandbox);
const admin = sandbox.memoryAdmin();
admin.icons = () => {};

assert.equal(
  JSON.stringify(Array.from(admin.memoryTypes, (type) => admin.memoryTypeLabel(type))),
  JSON.stringify(["全部", "事实", "经历", "偏好", "关系", "边界", "习惯", "决策", "补充"]),
  "all important-memory type tabs must use Chinese labels",
);
for (const type of admin.memoryTypes) {
  assert.ok(admin.memoryTypeDescription(type).trim().length > 0, `${type} needs a one-line description`);
  assert.equal(admin.memoryTypeDescription(type).includes("\n"), false, `${type} description must stay on one line`);
}

admin.memories = [
  { id: "author-first", created_at: "2026-08-01T00:00:00Z", _adminSourceOrder: 0 },
  { id: "newest", created_at: "2026-08-03T00:00:00Z", _adminSourceOrder: 1 },
  { id: "middle", created_at: "2026-08-02T00:00:00Z", _adminSourceOrder: 2 },
];
admin.applyMemorySort();
assert.equal(
  JSON.stringify(Array.from(admin.memories, (item) => item.id)),
  JSON.stringify(["author-first", "newest", "middle"]),
  "default mode must preserve the author's API order",
);

admin.toggleMemorySort();
assert.equal(admin.memorySort, "newest");
assert.equal(
  JSON.stringify(Array.from(admin.memories, (item) => item.id)),
  JSON.stringify(["newest", "middle", "author-first"]),
  "newest mode must sort created_at descending",
);

admin.toggleMemorySort();
assert.equal(admin.memorySort, "default");
assert.equal(
  JSON.stringify(Array.from(admin.memories, (item) => item.id)),
  JSON.stringify(["author-first", "newest", "middle"]),
  "second click must restore the author's original order",
);

assert.match(source, /x-text="memoryTypeLabel\(memory\.type\)"/);
assert.match(source, /x-text="memoryTypeLabel\(type\)"/);
assert.match(source, /x-text="memoryTypeLabel\(candidate\.type\)"/);
assert.match(source, /x-text="memoryTypeLabel\(mem\.type\)"/);
assert.match(source, /最新优先/);
assert.match(source, /默认排序/);
assert.match(source, /L4 · 稳定事实、偏好、边界和决策/);
assert.match(source, /grid grid-cols-2 gap-2 sm:flex sm:flex-wrap/);
assert.ok(source.includes(".bg-zinc-900\\/60 {"), "light mode must map merge picker cards to the shared panel color");
assert.doesNotMatch(source, /typeCount\(type\) \+ '\/' \+ typeLimit\(type\)/);
assert.match(source, /处理日期是梦境对应的聊天日期；实际运行是任务启动时间。/);
assert.match(source, /'实际运行 ' \+ fmt\(run\.started_at\)/);

assert.equal(admin.candidateSourceLabel("dream_update"), "系统 · 更新建议");
assert.equal(admin.memorySourceLabel("mcp"), "Elio 手写");
assert.equal(admin.memorySourceLabel("manual"), "茉茉手动");

admin.mergeTargets = [
  { id: "mem_elio", type: "relationship", source: "mcp", authored_by: "以昼", content: "我们记得这件事" },
  { id: "mem_system", type: "fact", source: "review", authored_by: null, content: "系统整理的项目事实" },
];
assert.equal(admin.selectedMergeTarget("mem_elio").authored_by, "以昼");
assert.equal(admin.isProtectedMergeTarget("mem_elio"), true);
assert.equal(admin.isProtectedMergeTarget("mem_system"), false);
assert.equal(admin.candidateMergeOptions({ mergeQuery: "项目" })[0].id, "mem_system");
assert.equal(admin.memoryMergeOptions({ id: "mem_system", mergeQuery: "" })[0].id, "mem_elio");

admin.dreamStatus = {
  raw_message_counts: [
    { date_label: "2026-08-26", raw_messages: 342, processed_messages: 120, remaining_messages: 222 },
    { date_label: "2026-08-25", raw_messages: 40, processed_messages: 40, remaining_messages: 0 },
  ],
};
const progress = admin.dreamDayBars();
assert.deepEqual(
  Array.from(progress, (day) => ({ processed: day.processed, remaining: day.remaining, done: day.done })),
  [
    { processed: 120, remaining: 222, done: false },
    { processed: 40, remaining: 0, done: true },
  ],
);
assert.match(admin.dreamRunNote({ reason: "model_error", error: "status=500" }), /历史记录没有保存服务端错误正文/);

assert.match(source, /目标记忆预览/);
assert.match(source, /待归档记忆/);
assert.match(source, /建议保留的重复记忆/);
assert.match(source, /系统没有给出可唯一定位的保留对象/);
assert.match(source, /一键合并到系统建议目标/);
assert.match(source, /搜索记忆正文或类型/);
assert.match(source, /亲笔保护/);
assert.match(source, /未加亲笔保护/);
assert.doesNotMatch(source, /未署名保护/);
assert.match(source, /<select x-model="memory\.draft\.type"/);
assert.match(source, /memory\.draft = \{ type: memory\.type, content: memory\.content \}/);
assert.match(source, /type: nextType/);
assert.match(source, /记忆已保存，并移到/);
assert.match(source, /candidate\.source === 'dream_delete'.*candidate\.target_memory\.authored_by/);
assert.doesNotMatch(source, /placeholder="目标 memory id"/);
assert.doesNotMatch(source, /candidate\.target_memory\.tags/);
assert.match(memoriesApi, /target_memory: row\.target_memory_id \? targets\.get/);
assert.match(memoriesApi, /related_memories:/);
assert.match(memoriesApi, /memoryIdReferences\(row\.decision_note\)/);
assert.match(memoriesApi, /fetchMemoriesByIdPrefixes/);
assert.ok((memoriesApi.match(/if \(target\.authored_by\)/g) || []).length >= 2, "delete and merge must both protect hand-authored targets");
assert.match(dreamApi, /processed_messages: processedMessages/);
assert.match(dreamApi, /remaining_messages: Math\.max/);
assert.match(dreamExtract, /readModelErrorDetail\(response\)/);
assert.match(indexSource, /backfill_skipped/);

console.log("ok: memory review provenance, protected target picker, Dream progress/error details, and prior mobile UI");
