const KEY = "notes-web-programming-achievements-v1";

const ACHIEVEMENTS = [
  { id: "first-blood", icon: "▸", title: "First Mission Complete", description: "Finish your very first level.", test: (s) => s.completed >= 1 },
  { id: "xp-100", icon: "◆", title: "Century Club", description: "Earn 100 XP.", test: (s) => s.xp >= 100 },
  { id: "xp-500", icon: "★", title: "Universe Ranger", description: "Earn 500 XP.", test: (s) => s.xp >= 500 },
  { id: "xp-1000", icon: "☄", title: "Galaxy Guardian", description: "Earn 1,000 XP.", test: (s) => s.xp >= 1000 },
  { id: "streak-5", icon: "≡", title: "On a Roll", description: "Complete 5 different levels.", test: (s) => s.completed >= 5 },
  { id: "pattern-10", icon: "✦", title: "Pattern Apprentice", description: "Complete 10 Pattern Lab levels.", test: (s) => s.patternCompleted >= 10 },
  { id: "pattern-50", icon: "▦", title: "Pattern Architect", description: "Complete 50 Pattern Lab levels.", test: (s) => s.patternCompleted >= 50 },
  { id: "quest-10", icon: "⌕", title: "Quest Explorer", description: "Complete 10 Code Quest levels.", test: (s) => s.questCompleted >= 10 },
  { id: "clean-90", icon: "✓", title: "Sharp Shooter", description: "Reach 90% accuracy over at least 10 attempts.", test: (s) => s.attempts >= 10 && s.accuracy >= 90 },
  { id: "interview-10", icon: "Q", title: "Interview Warm-Up", description: "Answer 10 interview questions.", test: (s) => s.interviewAnswered >= 10 },
  { id: "mock-done", icon: "🎩", title: "Mock Survivor", description: "Finish a full mock interview report.", test: (s) => s.mocksCompleted >= 1 },
  { id: "no-hints", icon: "∅", title: "Solo Solver", description: "Complete 5 levels without using any hint.", test: (s) => s.hintFreeCompleted >= 5 },
];

function loadUnlocked() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
    return Array.isArray(saved.unlockedIds) ? saved.unlockedIds : [];
  } catch { return []; }
}

function saveUnlocked(unlockedIds) {
  try { localStorage.setItem(KEY, JSON.stringify({ unlockedIds, version: 1 })); } catch { /* storage unavailable */ }
}

/** stats: { completed, xp, attempts, accuracy, patternCompleted, questCompleted, interviewAnswered, mocksCompleted, hintFreeCompleted } */
export function evaluateAchievements(stats) {
  const unlocked = new Set(loadUnlocked());
  const newly = [];
  for (const achievement of ACHIEVEMENTS) {
    if (!unlocked.has(achievement.id) && achievement.test(stats)) {
      unlocked.add(achievement.id);
      newly.push(achievement);
    }
  }
  if (newly.length) saveUnlocked([...unlocked]);
  return { unlocked: ACHIEVEMENTS.filter((a) => unlocked.has(a.id)), locked: ACHIEVEMENTS.filter((a) => !unlocked.has(a.id)), newlyUnlocked: newly };
}

export function getAchievementDefinitions() { return ACHIEVEMENTS; }
export function getUnlockedAchievementIds() { return loadUnlocked(); }

/** Single source of truth for learner statistics across chapters and the Arena. */
export function buildLearnerStats(practice, interview) {
  const results = practice.results || [];
  const attempts = results.length;
  const correctCount = results.filter((item) => item.correct).length;
  const byId = new Map((practice.allLevels || []).map((level) => [level.id, level]));
  const isPattern = (id) => (byId.get(id)?.chapterId || "code-quest") === "pattern-lab";
  return {
    completed: practice.completedLevelIds.length,
    xp: practice.xp || 0,
    attempts,
    accuracy: attempts ? Math.round((correctCount / attempts) * 100) : 0,
    patternCompleted: practice.completedLevelIds.filter(isPattern).length,
    questCompleted: practice.completedLevelIds.filter((id) => !isPattern(id)).length,
    interviewAnswered: interview.answeredIds.length,
    mocksCompleted: (() => { try { const saved = JSON.parse(localStorage.getItem("notes-web-interview-mock-history-v1") || "[]"); return Array.isArray(saved) ? saved.length : 0; } catch { return 0; } })(),
    hintFreeCompleted: results.filter((item) => item.correct && !item.hintsUsed).filter((item, index, all) => all.findIndex((other) => other.levelId === item.levelId) === index).length,
  };
}

/** Learner rank derived from XP — purely display, never stored. */
export function getRank(xp) {
  const ranks = [
    { min: 0, title: "Cadet" }, { min: 60, title: "Scout" }, { min: 150, title: "Explorer" },
    { min: 300, title: "Navigator" }, { min: 550, title: "Pilot" }, { min: 850, title: "Captain" },
    { min: 1200, title: "Admiral" }, { min: 1700, title: "Commodore" }, { min: 2400, title: "Legend" },
  ];
  let index = 0;
  for (let i = 0; i < ranks.length; i += 1) if (xp >= ranks[i].min) index = i;
  const current = ranks[index];
  const next = ranks[index + 1] || null;
  const level = index + 1;
  const progress = next ? Math.round(((xp - current.min) / (next.min - current.min)) * 100) : 100;
  return { level, title: current.title, nextAt: next?.min ?? null, progress };
}
