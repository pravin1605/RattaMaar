export default {
  id: "cq-vt-002",
  chapterId: "code-quest",
  subjectId: "java-fundamentals",
  modeId: "variable-tracker",
  levelNumber: 2,
  title: "Counter Leaping by Twos",
  difficulty: "beginner",
  estimatedMinutes: 2,
  challengeType: "trace-variable",
  instructions: "Two cells of the trace table were erased. Fill in both missing count values in table order.",
  content: {
    language: "java",
    prompt: "Complete the trace for the counter that steps by two each pass.",
    code: "int count = 0;\nfor (int i = 0; i < 5; i++) {\n    count += 2;\n}",
    trace: {
      columns: ["i", "count"],
      rows: [
        { cells: ["0", "2"] },
        { cells: ["1", "4"] },
        { cells: ["2", "?"], note: "third pass through the body" },
        { cells: ["3", "?"], note: "fourth pass through the body" },
        { cells: ["4", "10"] },
      ],
    },
    blanks: [
      { placeholder: "?", context: "count in the row where i = 2" },
      { placeholder: "?", context: "count in the row where i = 3" },
    ],
  },
  evaluation: { strategy: "fill-blanks", expectedBlanks: [["6"], ["8"]] },
  hints: [
    "count grows by the same fixed step on every pass, no matter what i is.",
    "Add the step size to the value recorded in the row directly above each missing cell.",
  ],
  explanation: {
    concept: "Constant-step accumulation",
    summary: "The loop body runs five times and adds a fixed step each time, so the trace grows as an arithmetic sequence.",
    details: "Starting from 0, each pass adds 2: 2, 4, 6, 8, 10. The erased rows therefore carry the third and fourth terms. Note that i controls how many passes happen while count controls the accumulated value; the two variables are independent.",
  },
  rewards: { xp: 17 },
  version: 1,
};
