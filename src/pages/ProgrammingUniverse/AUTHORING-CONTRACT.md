# Programming Universe — Content Authoring Contract (v2)

Every level is ONE self-contained data file. No central array edits needed — the registry discovers
`**/*.level.js` under `src/pages/ProgrammingUniverse/` at build time.

## File placement
- Code Quest levels: `src/pages/ProgrammingUniverse/chapters/code-quest/subjects/<lang-folder>/levels/<modeId>/<file>.level.js`
- Pattern Lab levels: `src/pages/ProgrammingUniverse/chapters/pattern-lab/subjects/<lang-folder>/levels/<categoryId>/<file>.level.js`
- Interview packs: `src/pages/ProgrammingUniverse/interviews/questions/<subject>.question.js` (exports an ARRAY)

## Level object contract (validated by `node tools/validate-content.mjs`)
```js
export default {
  id: "pl-stars-011",                 // GLOBAL UNIQUE, follow the assigned prefix scheme
  chapterId: "pattern-lab",           // "code-quest" (default) or "pattern-lab"
  subjectId: "java-fundamentals",     // as assigned
  modeId: "pattern-master",           // Code Quest: one of the 12 quest modes; Pattern Lab: "pattern-master" or "loop-tracer"
  categoryId: "stars",                // REQUIRED for pattern-lab: stars|numbers|alphabets|pyramids|hollow|nested-loops|number-properties|digits|series|advanced
  levelNumber: 11,                    // position in the unlock chain for (chapter, subject, mode, category)
  title: "...",                       // specific, never generic
  difficulty: "beginner|intermediate|advanced",
  estimatedMinutes: 3,
  timeLimitSeconds: 60,               // ONLY for modeId "timed-challenge" (integer >= 10)
  challengeType: "...",               // multiple-choice|predict-output|find-and-fix|code-completion|code-ordering|sql-query|algorithm-problem|true-false|fill-in-blank|fill-blanks|trace-variable|debug-output|pattern-prediction|numeric-answer
  instructions: "...",                // what the learner must do
  content: {
    language: "java",
    prompt: "...",
    code: "...",                      // the snippet under test (escaped \n)
    choices: [{ id: "a", label: "..." }],      // 2–4, used with strategy single-choice
    blocks: [{ id: "b1", code: "..." }],       // for code-ordering
    blanks: [{ placeholder: "...", context: "the line with ____" }],  // for fill-blanks
    patternRows: ["* ", ...],         // authored visualizer output: array of strings, NO trailing spaces, must equal expectedOutput joined by \n
    patternVariables: ["i=1 j=1", ...], // optional, one entry per patternRow
    trace: { columns: ["i","sum","print"], rows: [{ cells: ["1","1","1"], note: "optional explanation" }] }, // step table
    expectedOutput: "*\n* *",         // exact text answer when challengeType is predict-output/pattern-prediction typed answer
  },
  evaluation: { strategy: "...", ...},// see strategies below
  hints: ["...", "..."],              // >= 1, guide reasoning, never reveal the literal answer
  explanation: { concept: "...", summary: "...", details: "...", modelAnswer: "optional full code" },
  rewards: { xp: 15 },                // >= 10; boss levels 40–60
  prerequisites: ["other-level-id"],  // optional
  version: 1
};
```

## Evaluation strategies
| strategy | required fields | answer source |
|---|---|---|
| single-choice | `correctChoiceId` | one of `content.choices[].id` |
| validated-correction | `expectedFixId` | one of `content.choices[].id` (the fix) |
| exact-output | `expectedOutput` (or content.expectedOutput) | typed text, exact match after trim — use only when output is short; prefer `structured-answer` |
| exact-text | `expectedText` | typed text |
| structured-answer | `acceptedAnswers: ["..."]` | typed, case-insensitive match against list |
| case-insensitive-text | `expectedText` | typed |
| contains-text | `requiredText` | free text containing the phrase |
| numeric-tolerance | `expectedNumber`, optional `tolerance` | number |
| blank-count | `expectedCount` | integer (loop iterations etc.) |
| ordered-blocks | `expectedOrder` (all block ids in sequence) | code-ordering UI |
| fill-blanks | `expectedBlanks: ["...", ["a","b"], { accepted: [...] }]` — one entry per `content.blanks` slot | multi-input UI |

## Correctness rules (hard requirements)
1. Java semantics must be REAL. Trace every loop by hand before writing the answer.
2. `patternRows` must exactly match the printed output of the shown code (spaces between printed tokens, no trailing spaces).
3. No duplicates or trivial re-hashes: each level teaches/tests a distinct idea.
4. Hints must not contain the literal answer.
5. Explanations explain the WHY (loop bounds, printed characters, complexity).
6. Interview short-answer questions need `keyPoints: [...]` (3–5 checklist items) plus `answer` (model answer) and `explanation`.
7. Run `node tools/validate-content.mjs` from `D:\notes_web` and fix every issue mentioning your files.
