import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const source = await readFile(new URL("../src/api/admin/ui.ts", import.meta.url), "utf8");
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
assert.match(source, /排序：最新优先/);
assert.match(source, /排序：默认/);

console.log("ok: Chinese type labels, one-line descriptions, and reversible memory sorting");
