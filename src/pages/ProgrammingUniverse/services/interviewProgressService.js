const KEY = "notes-web-interview-lab-progress-v1";
const BOOKMARK_KEY = "notes-web-interview-bookmarks-v1";
const MOCK_KEY = "notes-web-interview-mock-history-v1";
const empty = { attempts: 0, correct: 0, answeredIds: [], results: [] };

export function getInterviewProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
    return { ...empty, ...saved, answeredIds: Array.isArray(saved.answeredIds) ? saved.answeredIds : [], results: Array.isArray(saved.results) ? saved.results : [] };
  } catch { return { ...empty }; }
}

export function recordInterviewAnswer(question, selectedOptionId, correct) {
  const current = getInterviewProgress();
  const result = { questionId: question.id, subjectId: question.subjectId, selectedOptionId, correct, answeredAt: new Date().toISOString() };
  const next = {
    attempts: current.attempts + 1,
    correct: current.correct + (correct ? 1 : 0),
    answeredIds: current.answeredIds.includes(question.id) ? current.answeredIds : [...current.answeredIds, question.id],
    results: [result, ...current.results].slice(0, 500),
  };
  try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* Keep the practice session usable if storage is unavailable. */ }
  return next;
}

/** Bookmarked questions for revision — isolated, versioned key. */
export function getBookmarkedIds() {
  try {
    const saved = JSON.parse(localStorage.getItem(BOOKMARK_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch { return []; }
}

export function toggleBookmark(questionId) {
  const current = getBookmarkedIds();
  const next = current.includes(questionId) ? current.filter((id) => id !== questionId) : [...current, questionId];
  try { localStorage.setItem(BOOKMARK_KEY, JSON.stringify(next)); } catch { /* ignore */ }
  return next;
}

/** Saved reports from completed mock interviews. */
export function getMockReports() {
  try {
    const saved = JSON.parse(localStorage.getItem(MOCK_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch { return []; }
}

export function saveMockReport(report) {
  const next = [{ ...report, completedAt: new Date().toISOString() }, ...getMockReports()].slice(0, 20);
  try { localStorage.setItem(MOCK_KEY, JSON.stringify(next)); } catch { /* ignore */ }
  return next;
}

