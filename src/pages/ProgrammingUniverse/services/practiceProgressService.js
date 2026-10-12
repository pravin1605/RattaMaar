const STORAGE_KEY = "notes-web-programming-progress-v1";

const emptyProgress = () => ({ completedLevels: 0, completedLevelIds: [], xp: 0, masteredTopics: 0, attempts: {}, results: [] });

export function getPracticeProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return { ...emptyProgress(), ...saved,
      completedLevelIds: Array.isArray(saved.completedLevelIds) ? saved.completedLevelIds : [],
      attempts: saved.attempts && typeof saved.attempts === "object" ? saved.attempts : {},
      results: Array.isArray(saved.results) ? saved.results : [],
    };
  } catch {
    return emptyProgress();
  }
}

function saveProgress(progress) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch { /* Private browsing or storage quota: keep the current session usable. */ }
  return progress;
}

export function recordLevelAttempt(level, { correct, selectedAnswer, hintsUsed = 0 }) {
  const current = getPracticeProgress();
  const attempts = { ...current.attempts, [level.id]: (current.attempts[level.id] || 0) + 1 };
  const alreadyCompleted = current.completedLevelIds.includes(level.id);
  const completedLevelIds = correct && !alreadyCompleted ? [...current.completedLevelIds, level.id] : current.completedLevelIds;
  const awardedXp = correct && !alreadyCompleted ? Math.max(0, Number(level.rewards?.xp || 0) - hintsUsed * 1) : 0;
  const result = { levelId: level.id, subjectId: level.subjectId, modeId: level.modeId, correct, selectedAnswer, hintsUsed, awardedXp, completedAt: new Date().toISOString() };
  return saveProgress({ ...current, attempts, completedLevelIds, completedLevels: completedLevelIds.length, xp: current.xp + awardedXp, results: [result, ...current.results].slice(0, 500) });
}

export function getLevelStatus(levelId) {
  const progress = getPracticeProgress();
  return { completed: progress.completedLevelIds.includes(levelId), attempts: progress.attempts[levelId] || 0 };
}

export function getPracticeStorageKey() { return STORAGE_KEY; }


/** A level is available when it is first in its chapter/subject/game-mode path or its predecessor is complete. */
export function getLevelAvailability(level, allLevels) {
  if (!level) return { unlocked: false, completed: false, reason: "Level unavailable" };
  const progress = getPracticeProgress();
  const completed = progress.completedLevelIds.includes(level.id);
  const siblings = (allLevels || []).filter((item) => (item.chapterId || "code-quest") === (level.chapterId || "code-quest") && item.subjectId === level.subjectId && item.modeId === level.modeId && (item.categoryId || null) === (level.categoryId || null)).sort((a, b) => a.levelNumber - b.levelNumber || a.id.localeCompare(b.id));
  const index = siblings.findIndex((item) => item.id === level.id);
  if (index <= 0) return { unlocked: true, completed, reason: "First level in this path" };
  const previous = siblings[index - 1];
  const previousComplete = progress.completedLevelIds.includes(previous.id);
  return { unlocked: completed || previousComplete, completed, previousLevel: previous, reason: previousComplete ? "Previous level complete" : `Complete level ${previous.levelNumber} first` };
}

