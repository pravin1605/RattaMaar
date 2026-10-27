/* =========================================================
   Reading streak, weekly goal and badges.
   Separate storage keys; existing progress/completed keys are
   never touched. Every call is safe if storage is blocked.
========================================================= */

const DAYS_KEY = "notes-web-reading-days";
const LOG_KEY = "notes-web-completion-log";
const GOAL_KEY = "notes-web-weekly-goal";
const DEFAULT_GOAL = 5;

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage blocked: stats simply don't persist */
  }
}

function dayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function startOfWeek(date = new Date()) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const offset = (d.getDay() + 6) % 7; /* Monday first */
  d.setDate(d.getDate() - offset);
  return d;
}

export function recordReadingDay() {
  const days = read(DAYS_KEY, []);
  const today = dayKey();
  if (!days.includes(today)) {
    days.push(today);
    write(DAYS_KEY, days.slice(-400));
  }
}

/* Counts a note once per day, so toggling "complete" can't inflate it. */
export function recordCompletion(noteKey) {
  const log = read(LOG_KEY, []);
  const today = dayKey();
  if (log.some((e) => e.k === noteKey && e.d === today)) return;
  log.push({ k: noteKey, d: today });
  write(LOG_KEY, log.slice(-600));
}

export function getWeeklyGoal() {
  const goal = Number(read(GOAL_KEY, DEFAULT_GOAL));
  return Number.isFinite(goal) && goal > 0 ? Math.min(goal, 50) : DEFAULT_GOAL;
}

export function setWeeklyGoal(goal) {
  write(GOAL_KEY, Math.max(1, Math.min(50, Math.round(goal))));
}

export function getReadingStats() {
  const days = new Set(read(DAYS_KEY, []));
  const log = read(LOG_KEY, []);

  /* Streak: consecutive days ending today (or yesterday, so the
     streak isn't shown as broken before you've read today). */
  let streak = 0;
  const cursor = new Date();
  if (!days.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (days.has(dayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  const weekStart = dayKey(startOfWeek());
  const weekDone = new Set(
    log.filter((e) => e.d >= weekStart).map((e) => e.k)
  ).size;
  const totalDone = new Set(log.map((e) => e.k)).size;
  const goal = getWeeklyGoal();

  const badges = [
    { id: "first", icon: "🌱", label: "First note done", earned: totalDone >= 1 },
    { id: "streak3", icon: "🔥", label: "3-day streak", earned: streak >= 3 },
    { id: "streak7", icon: "⚡", label: "7-day streak", earned: streak >= 7 },
    { id: "week5", icon: "📚", label: "5 notes this week", earned: weekDone >= 5 },
    { id: "week10", icon: "🏆", label: "10 notes this week", earned: weekDone >= 10 },
    { id: "goal", icon: "🎯", label: "Weekly goal met", earned: weekDone >= goal },
  ];

  return { streak, weekDone, goal, totalDone, badges };
}