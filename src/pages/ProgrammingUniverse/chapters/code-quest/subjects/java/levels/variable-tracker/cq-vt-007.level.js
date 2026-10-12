export default {
  id: "cq-vt-007",
  chapterId: "code-quest",
  subjectId: "java-fundamentals",
  modeId: "variable-tracker",
  levelNumber: 7,
  title: "The Reset-Before-Add Bug",
  difficulty: "intermediate",
  estimatedMinutes: 3,
  challengeType: "trace-variable",
  instructions: "This loop contains a subtle accumulator bug. Type the value that replaces the ? in the last row.",
  content: {
    language: "java",
    prompt: "Be careful: one statement inside the loop wipes progress every pass. What does total hold at the end?",
    code: "int total = 0;\nfor (int i = 1; i <= 4; i++) {\n    total = 0;\n    total += i;\n}",
    trace: {
      columns: ["i", "total after total = 0", "total after total += i"],
      rows: [
        { cells: ["1", "0", "1"] },
        { cells: ["2", "0", "2"] },
        { cells: ["3", "0", "3"] },
        { cells: ["4", "0", "?"], note: "the reset happens before the add, always" },
      ],
    },
  },
  evaluation: { strategy: "structured-answer", acceptedAnswers: ["4"] },
  hints: [
    "An accumulator must be initialized outside the loop, never rewritten inside it.",
    "Each pass throws away everything earlier passes achieved, then adds only the current i.",
  ],
  explanation: {
    concept: "Accumulator initialization scope",
    summary: "Because total = 0 runs inside the loop, nothing accumulates; total ends as just the last i value.",
    details: "The intended pattern adds to a running total that persists between passes. Here the reset executes at the start of every pass, so the final pass computes 0 + 4 = 4 instead of the expected 1 + 2 + 3 + 4. Fix: delete the inner reset and keep only the initialization before the loop.",
  },
  rewards: { xp: 27 },
  version: 1,
};
