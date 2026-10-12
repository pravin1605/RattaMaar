export default {
  id: "cq-vt-001",
  chapterId: "code-quest",
  subjectId: "java-fundamentals",
  modeId: "variable-tracker",
  levelNumber: 1,
  title: "Running Sum Step by Step",
  difficulty: "beginner",
  estimatedMinutes: 2,
  challengeType: "trace-variable",
  instructions: "The trace table follows one row per loop pass. Type the value that replaces the ? in the last row.",
  content: {
    language: "java",
    prompt: "What does sum hold after the loop finishes?",
    code: "int sum = 0;\nfor (int i = 1; i <= 4; i++) {\n    sum += i;\n}",
    trace: {
      columns: ["i", "sum"],
      rows: [
        { cells: ["1", "1"], note: "first pass adds i = 1" },
        { cells: ["2", "3"], note: "previous total grows by the new i" },
        { cells: ["3", "6"] },
        { cells: ["4", "?"], note: "last pass through the body" },
      ],
    },
  },
  evaluation: { strategy: "structured-answer", acceptedAnswers: ["10"] },
  hints: [
    "Each row adds the current i to the total recorded in the row above.",
    "Take the previous total shown in the table and add the final loop value of i to it.",
  ],
  explanation: {
    concept: "Accumulator pattern in loops",
    summary: "sum accumulates 1 + 2 + 3 + 4 across the four passes, ending at 10.",
    details: "sum starts at 0. After i=1 it is 1, after i=2 it is 3, after i=3 it is 6, and after i=4 it is 10. The running-total (accumulator) pattern is the basis of every summation loop, and the trace exposes how the value grows monotonically.",
  },
  rewards: { xp: 15 },
  version: 1,
};
