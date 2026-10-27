/* =========================================================
   Per-subject accent colours (reader header, progress bar,
   Home cards). Unknown subjects fall back to the purple used
   by the reader before this file existed.
========================================================= */

const ACCENTS = {
  hibernate: { solid: "#b45309", from: "#f59e0b", to: "#b45309" },
  "java-8-features": { solid: "#ea580c", from: "#fb923c", to: "#c2410c" },
  jdbc: { solid: "#0e7490", from: "#22d3ee", to: "#0e7490" },
  javascript: { solid: "#ca8a04", from: "#facc15", to: "#a16207" },
  plsql: { solid: "#be123c", from: "#fb7185", to: "#9f1239" },
  react: { solid: "#0284c7", from: "#38bdf8", to: "#0369a1" },
  servlet: { solid: "#c2410c", from: "#fdba74", to: "#9a3412" },
  "spring-boot": { solid: "#15803d", from: "#4ade80", to: "#166534" },
  "spring-core": { solid: "#0d9488", from: "#5eead4", to: "#0f766e" },
  "spring-mvc": { solid: "#16a34a", from: "#86efac", to: "#15803d" },
};

const FALLBACK = { solid: "#7c3aed", from: "#a78bfa", to: "#6d28d9" };

export function getSubjectAccent(subjectId) {
  return ACCENTS[subjectId] || FALLBACK;
}

/* CSS custom properties for an element's inline style. */
export function accentStyle(subjectId) {
  const a = getSubjectAccent(subjectId);
  return {
    "--reader-purple": a.solid,
    "--reader-purple-dark": a.to,
    "--accent-from": a.from,
    "--accent-to": a.to,
    "--reader-purple-soft": `color-mix(in srgb, ${a.solid} 13%, var(--bg-secondary))`,
  };
}