/**
 * Shared navigation helpers for the Programming Universe.
 * Keeping route construction in one place prevents the Home, Chapter,
 * Practice and Play screens from drifting apart.
 */

/** Path identifier used to group levels inside a chapter (mode for Code Quest, category for Pattern Lab). */
export function getPathId(level) {
  const chapterId = level.chapterId || "code-quest";
  return chapterId === "pattern-lab" ? level.categoryId || "uncategorised" : level.modeId;
}

export function getPathKey(level) {
  return `${level.subjectId}::${getPathId(level)}`;
}

/** Chapter level map for the path that contains this level. */
export function getLevelMapPath(level) {
  const chapterId = level.chapterId || "code-quest";
  return `/programming/chapters/${chapterId}?path=${encodeURIComponent(getPathKey(level))}`;
}

/** Mode level map in the Practice screen (Code Quest only). */
export function getPracticeMapPath(subjectId, modeId) {
  return `/programming/practice?subject=${encodeURIComponent(subjectId)}&mode=${encodeURIComponent(modeId)}`;
}

/** True when the browser history has an earlier in-app entry to return to. */
export function hasHistory() {
  return typeof window !== "undefined" && Number(window.history.state?.idx) > 0;
}

/** Return to the previous in-app screen, or to a sensible parent after a direct page load. */
export function goBackOr(navigate, fallback) {
  if (hasHistory()) navigate(-1);
  else navigate(fallback, { replace: true });
}