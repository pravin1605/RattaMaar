export default {
  id: "cq-vt-003",
  chapterId: "code-quest",
  subjectId: "java-fundamentals",
  modeId: "variable-tracker",
  levelNumber: 3,
  title: "How Many Passes Did the Builder Take?",
  difficulty: "beginner",
  estimatedMinutes: 2,
  challengeType: "trace-variable",
  instructions: "The last column counts loop passes executed so far. Type the number that replaces the ? in the final row.",
  content: {
    language: "java",
    prompt: "How many times did the loop body execute in total?",
    code: "StringBuilder sb = new StringBuilder();\nfor (int i = 0; i < 5; i++) {\n    sb.append(\"ab\");\n}",
    trace: {
      columns: ["i", "sb.length()", "passes executed"],
      rows: [
        { cells: ["0", "2", "1"] },
        { cells: ["1", "4", "2"] },
        { cells: ["2", "6", "3"] },
        { cells: ["3", "8", "4"] },
        { cells: ["4", "10", "?"], note: "the loop guard fails right after this pass" },
      ],
    },
  },
  evaluation: { strategy: "blank-count", expectedCount: 5 },
  hints: [
    "The guard lets i take every value from zero up to, but not including, the limit.",
    "The length column grows by a fixed amount per pass; divide it by that step to double-check your count.",
  ],
  explanation: {
    concept: "Loop trip count and string growth",
    summary: "The body executes once per i value from 0 through 4, giving five passes, and the builder grows by 2 characters each time.",
    details: "i < 5 is checked before each pass, so i takes 0, 1, 2, 3, 4 and the body runs five times. sb.length() reflects that: 2, 4, 6, 8, 10 — five growth steps of two characters appended via StringBuilder, which mutates in place instead of creating new strings.",
  },
  rewards: { xp: 19 },
  version: 1,
};
