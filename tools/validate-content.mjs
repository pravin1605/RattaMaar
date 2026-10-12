/**
 * Content validation harness — run with `node tools/validate-content.mjs` from the repo root.
 * Validates every .level.js and .question.js file in src/pages/ProgrammingUniverse against
 * the same contracts the runtime registries enforce, plus pattern-output consistency.
 */
import { readdirSync, readFileSync, writeFileSync, statSync, mkdtempSync, rmSync } from "node:fs";
import { join, relative } from "node:path";
import { tmpdir } from "node:os";
import { pathToFileURL, fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { validateLevel as validateLevelRuntime } from "../src/pages/ProgrammingUniverse/registry/levelSchema.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PU = join(ROOT, "src/pages/ProgrammingUniverse");

const CHALLENGE_TYPES = ["multiple-choice","predict-output","find-and-fix","code-completion","code-ordering","sql-query","algorithm-problem","true-false","fill-in-blank","fill-blanks","trace-variable","debug-output","pattern-prediction","numeric-answer"];
const STRATEGIES = ["single-choice","exact-output","validated-correction","exact-text","ordered-blocks","structured-answer","case-insensitive-text","contains-text","numeric-tolerance","fill-blanks","blank-count"];
const PATTERN_CATEGORIES = ["stars","numbers","alphabets","pyramids","hollow","nested-loops","number-properties","digits","series","advanced"];
const QUEST_MODES = ["output-detective","bug-hunter","code-builder","concept-quest","query-master","coding-arena","variable-tracker","logic-master","syntax-challenge","algorithm-architect","timed-challenge","boss-mission","pattern-master","loop-tracer"];

const files = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p);
    else if (entry.endsWith(".level.js") || entry.endsWith(".question.js")) files.push(p);
  }
})(PU);

async function loadModule(file) {
  // Load ESM without `export default` by rewriting to a CommonJS-safe temp module.
  const src = readFileSync(file, "utf8").replace(/export default/g, "module.exports =");
  const dir = mkdtempSync(join(tmpdir(), "puval-"));
  const tmp = join(dir, "m.cjs");
  writeFileSync(tmp, src);
  try { return await import(pathToFileURL(tmp).href + `?x=${Math.random()}`); }
  finally { rmSync(dir, { recursive: true, force: true }); }
}

const isStr = (v) => typeof v === "string" && v.trim().length > 0;
const issues = [];
const errors = (id, msgs) => issues.push({ id, file: null, errors: [].concat(msgs) });

function validateLevelExtras(level) {
  const e = [];
  if (!level || typeof level !== "object" || Array.isArray(level)) return ["Level must export an object."];
  for (const key of ["id","subjectId","modeId","title","instructions"]) if (!isStr(level[key])) e.push(`Missing required string: ${key}`);
  if (!Number.isInteger(level.levelNumber) || level.levelNumber < 1) e.push("levelNumber must be a positive integer.");
  if (!CHALLENGE_TYPES.includes(level.challengeType)) e.push(`challengeType must be one of: ${CHALLENGE_TYPES.join(", ")}`);
  if (!QUEST_MODES.includes(level.modeId)) e.push(`modeId "${level.modeId}" is not a registered game mode.`);
  if ((level.chapterId || "code-quest") === "pattern-lab") {
    if (!PATTERN_CATEGORIES.includes(level.categoryId)) e.push(`Pattern Lab levels require categoryId from: ${PATTERN_CATEGORIES.join(", ")}`);
  } else if (level.categoryId !== undefined) e.push("categoryId is only valid on pattern-lab chapter levels.");
  if (level.timeLimitSeconds !== undefined && (!Number.isInteger(level.timeLimitSeconds) || level.timeLimitSeconds < 10)) e.push("timeLimitSeconds must be an integer >= 10.");
  if (level.chapterId !== undefined && !["code-quest","pattern-lab"].includes(level.chapterId)) e.push(`Unknown chapterId: ${level.chapterId}`);
  const c = level.content;
  if (!c || typeof c !== "object") e.push("content must be an object.");
  if (c) {
    if (c.choices) {
      if (!Array.isArray(c.choices) || c.choices.length < 2) e.push("choices must be an array with 2+ items.");
      else if (c.choices.some((o) => !o || !isStr(o.id) || !isStr(o.label))) e.push("Every choice needs string id and label.");
      else if (new Set(c.choices.map((o) => o.id)).size !== c.choices.length) e.push("Choice ids must be unique.");
    }
    if (c.blocks) {
      if (!Array.isArray(c.blocks) || c.blocks.length < 2) e.push("blocks must be an array with 2+ items.");
      else if (c.blocks.some((b) => !b || !isStr(b.id) || !isStr(b.code))) e.push("Every block needs string id and code.");
    }
    if (c.blanks !== undefined && (!Array.isArray(c.blanks) || c.blanks.length === 0 || c.blanks.some((b) => !b || !isStr(b.placeholder)))) e.push("content.blanks needs placeholder strings.");
    if (c.trace !== undefined && (!c.trace.columns || !Array.isArray(c.trace.columns) || c.trace.columns.some((col) => !isStr(col)) || !Array.isArray(c.trace.rows) || c.trace.rows.length === 0 || c.trace.rows.some((row) => !row || !Array.isArray(row.cells) || row.cells.length !== c.trace.columns.length || row.cells.some((cell) => cell === undefined || cell === null || String(cell) === "")))) e.push("content.trace needs { columns: string[], rows: [{ cells: string[], note? }] } with matching cell counts.");
    if (c.patternRows !== undefined) {
      if (!Array.isArray(c.patternRows) || c.patternRows.some((r) => typeof r !== "string")) e.push("patternRows must be array of strings.");
      else {
        if (c.patternRows.some((row) => row !== row.replace(/\s+$/g, ""))) e.push("patternRows have trailing spaces; strip them.");
        if (isStr(c.expectedOutput)) {
          const a = c.patternRows.join("\n").trim(), b = c.expectedOutput.trim();
          if (a !== b) e.push("expectedOutput must equal patternRows joined by \\n (after trimming).");
        }
        const src = [c.code, c.codeBefore].filter(isStr).join("\n");
        const m = src.match(/(?:rows|n|size|limit|height)\s*=\s*(\d+)/i);
        if (m && c.patternRows.length < Number(m[1])) e.push(`patternRows has ${c.patternRows.length} rows but code sample uses n=${m[1]}.`);
      }
    }
    if ((level.challengeType === "pattern-prediction" || level.challengeType === "predict-output") && level.modeId === "pattern-master" && !c.patternRows && !isStr(c.expectedOutput) && !Array.isArray(c.choices)) e.push("Pattern prediction levels need patternRows, expectedOutput or choices.");
  }
  const ev = level.evaluation;
  if (!ev || typeof ev !== "object" || !STRATEGIES.includes(ev.strategy)) { e.push(`evaluation.strategy must be one of: ${STRATEGIES.join(", ")}`); return e; }
  if (ev.strategy === "single-choice") {
    if (!isStr(ev.correctChoiceId)) e.push("single-choice needs correctChoiceId.");
    else if (Array.isArray(c?.choices) && !c.choices.some((o) => o.id === ev.correctChoiceId)) e.push(`correctChoiceId "${ev.correctChoiceId}" is not in choices.`);
  }
  if (ev.strategy === "validated-correction" && !isStr(ev.expectedFixId)) e.push("validated-correction needs expectedFixId.");
  if (ev.strategy === "validated-correction" && Array.isArray(c?.choices) && !c.choices.some((o) => o.id === ev.expectedFixId)) e.push("expectedFixId must be one of the choices.");
  if (ev.strategy === "exact-output" && !isStr(ev.expectedOutput ?? c?.expectedOutput)) e.push("exact-output needs a non-empty expectedOutput.");
  if (ev.strategy === "exact-text" && !isStr(ev.expectedText ?? c?.expectedText)) e.push("exact-text needs expectedText.");
  if (ev.strategy === "ordered-blocks") {
    const ids = (c?.blocks || []).map((b) => b.id);
    if (!Array.isArray(ev.expectedOrder) || ev.expectedOrder.length !== ids.length) e.push("expectedOrder must list every block id exactly once.");
    else if (new Set(ev.expectedOrder).size !== ev.expectedOrder.length || ev.expectedOrder.some((id) => !ids.includes(id))) e.push("expectedOrder ids must match content.blocks ids.");
  }
  if (ev.strategy === "case-insensitive-text" && !isStr(ev.expectedText)) e.push("case-insensitive-text needs expectedText.");
  if (ev.strategy === "contains-text" && !isStr(ev.requiredText)) e.push("contains-text needs requiredText.");
  if (ev.strategy === "numeric-tolerance" && !Number.isFinite(Number(ev.expectedNumber))) e.push("numeric-tolerance needs expectedNumber.");
  if (ev.strategy === "blank-count" && !Number.isFinite(Number(ev.expectedCount))) e.push("blank-count needs expectedCount.");
  if (ev.strategy === "structured-answer" && (!Array.isArray(ev.acceptedAnswers) || !ev.acceptedAnswers.length)) e.push("structured-answer needs acceptedAnswers[].");
  if (ev.strategy === "fill-blanks") {
    if (!Array.isArray(ev.expectedBlanks) || !ev.expectedBlanks.length) e.push("fill-blanks needs expectedBlanks[].");
    else if (Array.isArray(c?.blanks) && ev.expectedBlanks.length !== c.blanks.length) e.push(`expectedBlanks count (${ev.expectedBlanks.length}) must match content.blanks count (${c.blanks.length}).`);
    else if (ev.expectedBlanks.some((b) => { const list = typeof b === "string" ? [b] : Array.isArray(b) ? b : b?.accepted; return !Array.isArray(list) || !list.length || list.some((x) => !isStr(x)); })) e.push("Each expected blank needs at least one non-empty accepted answer.");
  }
  if (!Array.isArray(level.hints) || level.hints.length < 1 || level.hints.some((h) => !isStr(h))) e.push("hints must be a non-empty array of strings.");
  if (!level.explanation || !isStr(level.explanation.summary)) e.push("explanation.summary is required.");
  if (!Number.isFinite(level.rewards?.xp) || level.rewards.xp < 10) e.push("rewards.xp must be a number >= 10.");
  if (level.estimatedMinutes !== undefined && !(Number.isInteger(level.estimatedMinutes) && level.estimatedMinutes >= 1)) e.push("estimatedMinutes must be a positive integer.");
  return e;
}

function validateQuestion(question) {
  const e = [];
  if (!question || typeof question !== "object") return ["Question must export an object."];
  for (const key of ["id","subjectId","subjectName","question","answer","explanation"]) if (!isStr(question[key])) e.push(`Missing required string: ${key}`);
  if (!["beginner","intermediate","advanced"].includes(question.difficulty)) e.push("Unsupported difficulty.");
  if (!["mcq","short-answer"].includes(question.type)) e.push("Unsupported type.");
  if (question.type === "mcq") {
    if (!Array.isArray(question.options) || question.options.length < 2 || question.options.length > 4) e.push("MCQ needs 2-4 options.");
    else {
      if (question.options.some((o) => !o || !isStr(o.id) || !isStr(o.text))) e.push("Options need id and text.");
      if (new Set(question.options.map((o) => o?.id)).size !== question.options.length) e.push("Option ids must be unique.");
      if (!question.options.some((o) => o.id === question.correctOptionId)) e.push("correctOptionId must exist in options.");
    }
  }
  if (question.type === "short-answer" && !Array.isArray(question.keyPoints)) e.push("short-answer questions should include a keyPoints checklist array.");
  if (question.keyPoints !== undefined && (!Array.isArray(question.keyPoints) || question.keyPoints.some((p) => !isStr(p)))) e.push("keyPoints must be non-empty strings.");
  return e;
}

const seenIds = new Map();
const results = [];
for (const file of files) {
  const rel = relative(ROOT, file).replace(/\\/g, "/");
  let mod;
  try { mod = await loadModule(file); }
  catch (err) { issues.push({ id: rel, errors: [`Module failed to load: ${err.message}`] }); continue; }
  const exported = mod.default ?? mod;
  const items = file.endsWith(".question.js") ? (Array.isArray(exported) ? exported : [exported]) : [exported];
  if (file.endsWith(".question.js") && !Array.isArray(exported)) issues.push({ id: rel, errors: ["Question packs must export an array."] });
  for (const item of items) {
    const e = file.endsWith(".question.js") ? validateQuestion(item) : [...validateLevelRuntime(item).errors, ...validateLevelExtras(item)];
    if (item?.id) {
      if (seenIds.has(item.id)) e.push(`Duplicate id with ${seenIds.get(item.id)}`);
      else seenIds.set(item.id, rel);
    } else e.push("Missing id.");
    if (e.length) issues.push({ id: item?.id || rel, file: rel, errors: e });
    results.push({ file: rel, id: item?.id, chapterId: item?.chapterId, subjectId: item?.subjectId, modeId: item?.modeId, categoryId: item?.categoryId, difficulty: item?.difficulty, type: item?.type });
  }
}

const levels = results.filter((r) => r.file.endsWith(".level.js"));
const questions = results.filter((r) => r.file.endsWith(".question.js"));
const count = (fn) => levels.filter(fn).length;
const byCategory = {}, byMode = {}, byInterviewSubject = {};
for (const l of levels) {
  if (l.categoryId) byCategory[l.categoryId] = (byCategory[l.categoryId] || 0) + 1;
  if ((l.chapterId || "code-quest") === "code-quest") byMode[l.modeId] = (byMode[l.modeId] || 0) + 1;
}
for (const q of questions) byInterviewSubject[q.subjectId] = (byInterviewSubject[q.subjectId] || 0) + 1;

console.log(`Levels: ${levels.length} | Interview questions: ${questions.length}`);
console.log("Pattern Lab per category:", JSON.stringify(byCategory, null, 0));
console.log("Code Quest per mode:", JSON.stringify(byMode, null, 0));
console.log("Interview per subject:", JSON.stringify(byInterviewSubject, null, 0));
if (issues.length) {
  console.log(`\n${issues.length} PROBLEM(S):`);
  for (const issue of issues) console.log(`  ${issue.id} (${issue.file || "?"})\n    - ${issue.errors.join("\n    - ")}`);
  process.exit(1);
}
console.log("\nAll content files valid.");
