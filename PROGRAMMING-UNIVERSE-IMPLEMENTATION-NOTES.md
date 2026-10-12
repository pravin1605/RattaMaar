# NotesWeb → Programming Universe — delivered source

Programming Universe is a game-based programming practice area mounted inside the existing NotesWeb
React PWA at `/programming`. NotesWeb keeps every route, component, style and storage key it had
before; the Universe is additive.

## What is in this source

| Area | Where | What it does |
|---|---|---|
| Entry card | `src/pages/Home/Home.jsx` + `src/pages/Home/ProgrammingUniverseEntry.css` | One new section on NotesWeb Home linking to `/programming`. |
| Routing | `src/App.jsx` | Adds a `/programming/*` route tree with its own layout and navigation. Existing routes untouched. |
| Screens | `src/pages/ProgrammingUniverse/*.jsx` | Home, Subjects, Subject, Chapter, Practice, Play, Interview Arena, Progress. |
| Content engine | `engine.js`, `registry/`, `chapters/`, `interviews/` | Build-time discovery of `*.level.js` and `*.question.js`, schema validation, deterministic scoring. |
| Progression | `services/` | XP, ranks, attempts, unlocks, achievements, bookmarks, mock-interview reports — all local. |
| Styles | `programming-universe.css` | Single documented design system, mobile-first. |

## Content counts (read from the live registries, not hard-coded)

`node tools/validate-content.mjs` prints these on every run:

- **220 playable levels**
  - Chapter 1 Code Quest: 120 — 12 game modes × 10 levels (Java 100, SQL 10, DSA 10)
  - Chapter 2 Pattern & Series Lab: 100 — 10 categories × 10 levels
- **77 interview questions** in 12 packs: Java 10, SQL 10, DBMS 10, DSA 10, OOP 10, HR 10, JavaScript 17
- 12 subjects in the curated catalogue (independent of the NotesWeb notes catalogue); 9 marked
  AVAILABLE because they own levels or interview questions, 3 honest "COMING LATER" placeholders.

## Architecture rules that hold the system together

1. **Content is data.** A level is one `.level.js` file; a question pack is one `.question.js` array.
   Nothing imports them by hand — `import.meta.glob` discovers them and the registries validate them.
   A file that fails the schema is dropped from the runtime registry, so the UI can never show a
   half-authored level.
2. **One contract, two consumers.** `registry/levelSchema.js` is the single source of truth. The
   runtime registry and `tools/validate-content.mjs` both call it, so the CLI cannot drift from what
   the browser enforces. (Verified by injecting a deliberate failing rule into the schema and
   watching all 220 levels get reported.)
3. **No code execution.** The evaluator compares the learner's answer against authored, expected
   values using a fixed strategy list. Submitted text is never compiled or run.
4. **Unlock chains are scoped** by `(chapterId, subjectId, modeId, categoryId)`. Finishing a Code
   Quest level never unlocks a Pattern Lab level, and one Pattern Lab category never unlocks another.
5. **Storage is versioned and namespaced.** `notes-web-programming-progress-v1`,
   `notes-web-interview-lab-progress-v1`, `notes-web-interview-bookmarks-v1`,
   `notes-web-interview-mock-history-v1`, `notes-web-programming-achievements-v1`. None of them
   collide with NotesWeb keys (`notes-web-progress-*`, `notes-web-recent`, `notes-web-streak`,
   `notes-web-theme`, `notes-web-favorite-*`). The shape is a single JSON object per key so an
   account/cloud layer can be added later — no sync exists today.

## Changed files vs the supplied baseline

- **Added**: 260 files under `src/pages/ProgrammingUniverse/`, `src/pages/Home/ProgrammingUniverseEntry.css`,
  `tools/validate-content.mjs`, `tools/` helper, 4 markdown docs (this file, `AUTHORING-CONTRACT.md`,
  `LEVEL-AUTHORING-GUIDE.md`, `COMPLETE-IMPLEMENTATION-GUIDE.md`, `README-PHASE-2.md`).
- **Modified**: `src/App.jsx` (route tree only), `src/pages/Home/Home.jsx` (entry card only).
- **Deleted**: nothing.

## Run it

```bash
npm install          # existing NotesWeb dependencies, none added
npm run dev          # then open /programming
node tools/validate-content.mjs   # content + schema validation, exits non-zero on any problem
npm run build        # production build incl. PWA precache
```

## Test report — what was actually executed

All commands run against `D:\notes_web` on 2026-10-12.

| Check | Result |
|---|---|
| `node tools/validate-content.mjs` | Pass — 220 levels, 77 questions, 0 problems (duplicate IDs, missing fields, answer/reference integrity, pattern-output consistency). |
| Validator ↔ runtime coupling | Pass — a deliberate failing rule added to `levelSchema.js` produced 220 CLI failures; schema restored afterwards. |
| `npm run build` | Pass — Vite 8 production build, PWA precache 203 entries (~4.3 MB). Only the pre-existing >500 kB chunk-size advisory. |
| `npx oxlint src/pages/ProgrammingUniverse` | 0 errors, 2 warnings (`react/set-state-in-effect` on the reset-on-prop-change effects in `ProgrammingPlay.jsx` and `ProgrammingInterviewLab.jsx`). |
| Browser QA (dev server, Chromium automation) | Pass — see below. |
| NotesWeb regression | Pass — Home (streak, level, subjects, quiz CTA, continue reading), `/subjects`, `/subjects/react`, note reader `/notes/react/react-05`, `/favorites`, `/settings`, bottom nav; zero console errors or warnings on the visited routes. |
| Locked level via direct URL | Pass — `/programming/play/cq-tc-002` renders the "Mission locked" screen with the predecessor's name instead of the challenge. |
| Timed level expiry | Pass — `cq-tc-001` (20 s): attempts went 7 → 8 on expiry with exactly one recorded failure, inputs disabled, explanation shown; reload starts a fresh countdown at the same attempt count (no phantom attempt on mount). |
| Interview Arena | Pass — 77 questions loaded, 6 arenas, subject/difficulty filters, revision list, and the honest "no automatic free-text grading" notice. |
| Pattern Lab | Pass — 10 categories × 10 levels, each category's level 01 unlocked independently, row-by-row visualizer and trace table render. |

Not covered by a test: real-device PWA install, and visual review at every breakpoint beyond the
automated viewport.

## Known limitations

- Java is the only fully populated Code Quest subject; SQL and DSA have 10 levels each and the other
  catalogue subjects are interview-only or "COMING LATER".
- Free-text answers are self-assessed against a model answer plus a key-point checklist. There is no
  automatic grading of prose, and none is claimed in the UI.
- No accounts, no cloud sync, no server-side progress. Clearing site data clears Universe progress.
- Pattern answers are authored output, not executed code; a secure Java/JS execution service is out of
  scope and would need its own sandbox.
- Achievements derive from local attempt history only, so they can be gamed by replaying levels.
- The bundle is a single ~939 kB JS chunk; content packs are not code-split per chapter.
