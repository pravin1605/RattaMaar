# Programming Universe: adding levels

The visible learning hierarchy is deliberately **Subject → Game Mode → Level**. It does not reuse NotesWeb note titles and does not require a topic catalogue.

## Add a playable level

1. Choose a chapter (`code-quest` or `pattern-lab`), subject ID, and game-mode ID.
2. Add a new file ending in `.level.js` under the matching chapter/subject/mode folder. Examples:
   - `chapters/code-quest/subjects/java/levels/bug-hunter/level-004.level.js`
   - `chapters/pattern-lab/subjects/java/levels/pattern-master/java-pattern-diamond-007.level.js`
3. Export one level object. Required fields are `id`, `subjectId`, `modeId`, `title`, `instructions`, `levelNumber`, `challengeType`, `content`, `evaluation`, `hints`, and `explanation.summary`. Include `chapterId` explicitly.
4. Give every level a unique ID. Increase the level number within its path, which is scoped by chapter + subject + game mode (+ `categoryId` on Pattern Lab levels, where it is required). Level 1 of each path is open; the next one unlocks when the previous is completed, and no path unlocks another.
5. Vite discovers `.level.js` files automatically. Do not edit a central array or add a React component for each level.
6. Open the relevant chapter, select the subject's game mode, and play. The first level is available immediately; later levels unlock after the previous level is completed.
7. Run `node tools/validate-content.mjs` from the project root. It shares `registry/levelSchema.js` with the runtime registry, so anything the CLI rejects would also disappear from the app. Fix every issue it reports for your files.

## Supported evaluation strategies

- `single-choice`: `evaluation.correctChoiceId` matches a choice ID.
- `validated-correction`: `evaluation.expectedFixId` matches a correction ID.
- `exact-output`: `evaluation.expectedOutput` is the expected output.
- `exact-text`: `evaluation.expectedText` is the expected text.
- `case-insensitive-text`: expected text ignoring capitalization.
- `contains-text`: `evaluation.requiredText` must appear in the response.
- `numeric-tolerance`: `evaluation.expectedNumber` plus optional `tolerance`.
- `blank-count`: `evaluation.expectedCount` is the integer the learner reports.
- `ordered-blocks`: `content.blocks` has unique IDs and `evaluation.expectedOrder` defines the answer.
- `fill-blanks`: `content.blanks` gives one placeholder per input and `evaluation.expectedBlanks` accepts a string, an array of accepted strings, or `{ accepted: [...] }` per slot.
- `structured-answer`: `evaluation.acceptedAnswers` contains accepted responses.

Content extras the play screen renders: `content.patternRows` (+ optional `patternVariables`) drives the
row-by-row Pattern Visualizer, `content.trace` renders a step-by-step trace table, `content.blocks` gives
the code-ordering UI, and `content.blanks` gives the multi-blank UI. Set `timeLimitSeconds` (integer ≥ 10)
only on `timed-challenge` levels; the runner shows a countdown and fails the attempt when it reaches zero.
None of these execute learner code — they reveal authored output.

## Dynamic interview question packs

Add a `*.question.js` file under `interviews/questions/`. Export an array of question objects. Each question must have a unique `id`, a catalogue `subjectId`, `subjectName`, `difficulty`, `type` (`mcq` or `short-answer`), `question`, `answer`, and `explanation`. MCQs need 2–4 `options` with unique IDs and a `correctOptionId` that exists among them; short answers need a `keyPoints` checklist. The Arena discovers packs automatically, validates them, and feeds its filters, shuffle, bookmarking and mock report from the same registry.

Written answers are self-assessed against the model answer and key-point checklist. There is no automatic free-text grading, and the UI says so.

Arbitrary user code is not executed. Secure compilation and runtime test cases would require a separately designed execution service.
