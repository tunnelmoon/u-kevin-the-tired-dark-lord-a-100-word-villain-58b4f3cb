// The Tired Dark Lord: a 100-word villain monologue.
// A dark lord three centuries into his reign, too tired to be theatrical,
// meeting the latest torch-bearing hero on his own staircase.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Again with the torches. I counted them from the balcony, all forty-seven, and not one of you thought to bring a ladder. Sit down, hero. No, not there, the cushion is older than your kingdom and more patient. I have ruled the Ashen Coast for three hundred years, I have cursed harvests, drowned fleets, signed the Tithe of Teeth in blood, and tonight my enemy is this staircase. Twenty-one steps. I counted them. State your quest, swing if you must, but do it before the bell rings, because after the bell I nap, and I do not wake for prophecies.";

const words = ENTRY.trim().split(/\s+/).filter((w) => w.length > 0);
if (ENTRY.length < 1 || ENTRY.length > 600) {
  throw new Error(`entry must be 1-600 characters, got ${ENTRY.length}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (words.length < 95 || words.length > 105) {
  throw new Error(`entry must be about 100 words, got ${words.length}`);
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}
// The tiredness must be felt, never announced: reject any line that says
// the villain is tired outright (judge criterion 2).
const announced = ["tired", "weary", "exhausted", "fatigued", "sleepy"];
for (const w of announced) {
  if (new RegExp(`\\b${w}\\b`, "i").test(ENTRY)) {
    throw new Error(`entry announces tiredness with "${w}"`);
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Round-trip read-back check: what was written must match exactly.
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) {
  throw new Error("round-trip read-back mismatch");
}
console.log(`wrote ${outPath} (${ENTRY.length} chars, ${words.length} words)`);
