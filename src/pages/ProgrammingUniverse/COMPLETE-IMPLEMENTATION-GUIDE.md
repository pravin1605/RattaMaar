# NotesWeb Programming Universe — Revised Integrated Source

## Product structure

- **Programming Universe**: a separate learning area inside NotesWeb at `/programming`.
- **Chapter 1 — Code Quest**: playable programming challenges such as output prediction, debugging and code completion.
- **Chapter 2 — Pattern & Series Lab**: visual star patterns, number printing, alphabet patterns, mathematical series and nested-loop tracing.
- **Subject catalogue**: curated programming/computer-science subjects independent from NotesWeb note titles. The visible hierarchy is **Subject → Game Mode → Level**; there is no note-derived topic catalogue.
- **Dynamic Interview Lab**: subject and difficulty filters, practice and study modes, answer feedback, model answers, explanations, question shuffle, and local attempt history.
- **Shared engine**: level validation, challenge evaluation, hints, XP, ranks, achievements, daily mission, progress persistence, path-scoped unlocking, timed missions, and automatic Vite discovery.

## Authored content

Counts come from the registries at build time — run `node tools/validate-content.mjs` to reproduce them.

- **220 playable levels**: Code Quest 120 (12 game modes × 10 levels; Java 100, SQL 10, DSA 10) and Pattern & Series Lab 100 (10 categories × 10 levels).
- **77 technical interview questions** in 12 packs: Java, SQL, DBMS, DSA, OOP and HR at 10 each, JavaScript 17.
- Every level and question is authored individually with its own answer, hints and explanation. Formats vary within a mode (multiple choice, predict output, find-and-fix, code completion, code ordering, fill blanks, trace table, numeric answer, pattern prediction, boss missions) so packs are not filler variations of one question.

## Installation

1. Back up the complete NotesWeb project.
2. Extract this ZIP and merge its `src` folder into the existing project, allowing corresponding updated files to replace their older versions.
3. Keep the existing `package.json`, `index.html`, Vite configuration, public assets, and deployment settings.
4. Run the existing development command, commonly `npm run dev`.
5. Open `/programming`, then try Code Quest, Pattern & Series Lab, and Interview Lab.

## Suggested smoke test

1. Confirm NotesWeb Home and the existing notes/quiz routes still open.
2. Open `/programming` and select either chapter.
3. Open a level, try a wrong answer, reveal a hint, then submit the correct answer.
4. Confirm XP and completion are recorded; confirm the next level unlocks only in the same chapter/subject/game-mode path.
5. Open Pattern & Series Lab and use its row-by-row visualizer.
6. Open `/programming/interviews`, filter Java or SQL, select a difficulty, answer a question, and verify the explanation and attempt statistics.
7. Switch to Study Mode and verify model answers/explanations are visible.
8. Refresh and confirm progress persists locally.

## Storage and safety

Challenge and interview attempts are saved in versioned, namespaced local-storage keys (`notes-web-*-v1`) that never overlap with NotesWeb's own keys. There are no accounts or cloud sync in this revision; the storage shape is one JSON object per key so a sync layer can be added later. The app evaluates authored answers; it does not compile or execute submitted code.

## Verification performed

The build was run inside the complete NotesWeb project, not a source-only archive:

- `node tools/validate-content.mjs` → 220 levels, 77 questions, 0 problems.
- `npm run build` → production build plus PWA precache generated successfully.
- `npx oxlint src/pages/ProgrammingUniverse` → 0 errors.
- Browser pass over Universe home, both chapters, subject pages, the play screen, timed expiry, a locked level opened by direct URL, the Interview Arena, Progress, and the untouched NotesWeb routes.

Remaining gaps are listed in `PROGRAMMING-UNIVERSE-IMPLEMENTATION-NOTES.md` under Known limitations.
