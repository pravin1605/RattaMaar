import baseModes from "../data/gameModes";

const modeDefaults = {
  "output-detective": ["predict-output", "multiple-choice"],
  "bug-hunter": ["find-and-fix", "multiple-choice"],
  "code-builder": ["code-completion", "code-ordering"],
  "concept-quest": ["multiple-choice"],
  "query-master": ["sql-query", "find-and-fix", "predict-output"],
  "coding-arena": ["algorithm-problem", "predict-output", "find-and-fix", "code-completion"],
  "pattern-master": ["predict-output", "multiple-choice", "find-and-fix", "code-completion"],
  "loop-tracer": ["predict-output", "multiple-choice", "trace-variable"],
  "variable-tracker": ["trace-variable", "fill-blanks", "numeric-answer"],
  "logic-master": ["multiple-choice", "find-and-fix", "predict-output"],
  "syntax-challenge": ["fill-blanks", "fill-in-blank", "multiple-choice"],
  "algorithm-architect": ["code-ordering", "code-completion", "multiple-choice"],
  "timed-challenge": ["multiple-choice", "predict-output", "numeric-answer"],
  "boss-mission": ["code-ordering", "fill-blanks", "predict-output", "multiple-choice"],
};

export const gameModes = Object.freeze(baseModes.map((mode) => ({
  ...mode,
  supportedChallengeTypes: mode.supportedChallengeTypes || modeDefaults[mode.id] || [],
})));

export function getGameModes() { return gameModes.filter((mode) => mode.scope === "code-quest"); }
export function getGameModeById(modeId) { return gameModes.find((mode) => mode.id === modeId) || null; }

const patternCategories = Object.freeze((gameModes.find((mode) => mode.id === "pattern-category")?.groups || []).map((category) => ({
  ...category, scope: "pattern-lab",
  titleCase: category.title,
})));

export function getPatternCategories() { return patternCategories; }
export function getPatternCategoryById(categoryId) { return patternCategories.find((category) => category.id === categoryId) || null; }
