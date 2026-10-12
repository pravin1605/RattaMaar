import { validateLevel, createLevelSummary } from "./levelSchema";

// Discover levels anywhere inside ProgrammingUniverse. Add a .level.js file to a chapter/subject/mode folder.
const levelModules = import.meta.glob("../**/*.level.js", { eager: true, import: "default" });
const rawLevels = Object.values(levelModules).filter(Boolean);
const ids = new Set();
const validationIssues = [];

export const levels = rawLevels.filter((level) => {
  const result = validateLevel(level);
  if (!result.valid) validationIssues.push({ id: level?.id || "<unknown>", errors: result.errors });
  if (result.valid && ids.has(level.id)) validationIssues.push({ id: level.id, errors: ["Duplicate level id."] });
  if (result.valid && ids.has(level.id)) return false;
  if (result.valid) ids.add(level.id);
  return result.valid;
}).sort((a, b) => (a.chapterId || "code-quest").localeCompare(b.chapterId || "code-quest") || a.subjectId.localeCompare(b.subjectId) || a.modeId.localeCompare(b.modeId) || a.levelNumber - b.levelNumber || a.id.localeCompare(b.id));

export function getLevels() { return levels; }
export function getLevelById(levelId) { return levels.find((level) => level.id === levelId) || null; }
export function getLevelsForSubject(subjectId) { return levels.filter((level) => level.subjectId === subjectId); }
export function getLevelsForMode(subjectId, modeId) { return levels.filter((level) => level.subjectId === subjectId && level.modeId === modeId); }
export function getLevelsForChapter(chapterId) { return levels.filter((level) => (level.chapterId || "code-quest") === chapterId); }
export function getLevelsForCategory(chapterId, categoryId) { return levels.filter((level) => (level.chapterId || "code-quest") === chapterId && level.categoryId === categoryId); }
export function getLevelSummaries(subjectId, modeId) {
  return levels.filter((level) => (!subjectId || level.subjectId === subjectId) && (!modeId || level.modeId === modeId)).map(createLevelSummary);
}
export function getLevelValidationIssues() {
  const known = new Set(levels.map((level) => level.id));
  const referenceIssues = levels
    .filter((level) => Array.isArray(level.prerequisites) && level.prerequisites.some((id) => !known.has(id)))
    .map((level) => ({ id: level.id, errors: [`Broken prerequisite reference: ${level.prerequisites.filter((id) => !known.has(id)).join(", ")}`] }));
  return [...validationIssues, ...referenceIssues];
}
