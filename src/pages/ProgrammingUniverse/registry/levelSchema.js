/** Shared contract for every authored Programming Universe level. */
export const CHALLENGE_TYPES = Object.freeze([
  "multiple-choice",
  "predict-output",
  "find-and-fix",
  "code-completion",
  "code-ordering",
  "sql-query",
  "algorithm-problem",
  "true-false",
  "fill-in-blank",
  "fill-blanks",
  "trace-variable",
  "debug-output",
  "pattern-prediction",
  "numeric-answer",
]);

export const EVALUATION_STRATEGIES = Object.freeze([
  "single-choice",
  "exact-output",
  "validated-correction",
  "exact-text",
  "ordered-blocks",
  "structured-answer",
  "case-insensitive-text",
  "contains-text",
  "numeric-tolerance",
  "fill-blanks",
  "blank-count",
]);

const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;

export function validateLevel(level) {
  const errors = [];
  if (!level || typeof level !== "object" || Array.isArray(level)) {
    return { valid: false, errors: ["Level must export an object."] };
  }
  for (const key of ["id", "subjectId", "modeId", "title", "instructions"]) {
    if (!isNonEmptyString(level[key])) errors.push(`Missing required string: ${key}`);
  }
  if (!Number.isInteger(level.levelNumber) || level.levelNumber < 1) errors.push("levelNumber must be a positive integer.");
  if (!isNonEmptyString(level.challengeType) || !CHALLENGE_TYPES.includes(level.challengeType)) {
    errors.push(`challengeType must be one of: ${CHALLENGE_TYPES.join(", ")}`);
  }
  if (!level.content || typeof level.content !== "object") errors.push("content must be an object.");
  if (level.content && typeof level.content === "object") {
    if (Array.isArray(level.content.choices) && level.content.choices.some((choice) => !choice || typeof choice.id !== "string" || typeof choice.label !== "string")) errors.push("Every choice must include string id and label fields.");
    if (Array.isArray(level.content.blocks)) {
      const blockIds = level.content.blocks.map((block) => block?.id);
      if (level.content.blocks.some((block) => !block || typeof block.id !== "string" || typeof block.code !== "string")) errors.push("Every code block must include string id and code fields.");
      if (new Set(blockIds).size !== blockIds.length) errors.push("Code block ids must be unique.");
    }
    if (level.content.blanks !== undefined) {
      if (!Array.isArray(level.content.blanks) || level.content.blanks.length === 0 || level.content.blanks.some((blank) => !blank || !isNonEmptyString(blank.placeholder))) errors.push("content.blanks must be a non-empty array of { placeholder, accepted? } objects.");
    }
    if (level.content.trace !== undefined) {
      const trace = level.content.trace;
      if (!trace || !Array.isArray(trace.columns) || trace.columns.some((col) => !isNonEmptyString(col)) || !Array.isArray(trace.rows) || trace.rows.length === 0) errors.push("content.trace must be { columns: string[], rows: [{ cells: string[] }] }.");
      else if (trace.rows.some((row) => !row || !Array.isArray(row.cells) || row.cells.length !== trace.columns.length || row.cells.some((cell) => cell === undefined || cell === null || String(cell).trim() === ""))) errors.push("Every trace row must provide one cell per trace column.");
    }
    if (level.content.patternRows !== undefined && (!Array.isArray(level.content.patternRows) || level.content.patternRows.some((row) => typeof row !== "string"))) errors.push("content.patternRows must be an array of strings.");
  }
  if (level.evaluation?.strategy === "fill-blanks") {
    const expected = level.evaluation.expectedBlanks;
    const blankIsAccepted = (blank) => (Array.isArray(blank) ? blank.length > 0 && blank.every(isNonEmptyString)
      : typeof blank === "string" ? isNonEmptyString(blank)
      : blank && Array.isArray(blank.accepted) && blank.accepted.length > 0 && blank.accepted.every(isNonEmptyString));
    if (!Array.isArray(expected) || expected.length === 0 || expected.some((blank) => !blankIsAccepted(blank))) errors.push("fill-blanks evaluation requires expectedBlanks: array of strings, string arrays or { accepted: string[] }.");
  }
  if (level.categoryId !== undefined && !isNonEmptyString(level.categoryId)) errors.push("categoryId must be a non-empty string when present.");
  if (level.timeLimitSeconds !== undefined && (!Number.isInteger(level.timeLimitSeconds) || level.timeLimitSeconds < 10)) errors.push("timeLimitSeconds must be an integer of at least 10.");
  if (!level.evaluation || typeof level.evaluation !== "object") errors.push("evaluation must be an object.");
  if (level.evaluation && !EVALUATION_STRATEGIES.includes(level.evaluation.strategy)) {
    errors.push(`Unsupported evaluation strategy: ${level.evaluation.strategy}`);
  }
  if (!Array.isArray(level.hints)) errors.push("hints must be an array.");
  if (!level.explanation || !isNonEmptyString(level.explanation.summary)) errors.push("explanation.summary is required.");
  if (level.rewards && (!Number.isFinite(level.rewards.xp) || level.rewards.xp < 0)) errors.push("rewards.xp must be a non-negative number.");
  return { valid: errors.length === 0, errors };
}

export function createLevelSummary(level) {
  return {
    id: level.id, chapterId: level.chapterId || "code-quest", subjectId: level.subjectId, modeId: level.modeId,
    categoryId: level.categoryId || null,
    levelNumber: level.levelNumber, title: level.title, difficulty: level.difficulty || "beginner",
    challengeType: level.challengeType, xp: level.rewards?.xp || 0,
  };
}
