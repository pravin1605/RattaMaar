export default {
  id: "cq-vt-004",
  chapterId: "code-quest",
  subjectId: "java-fundamentals",
  modeId: "variable-tracker",
  levelNumber: 4,
  title: "Nested Loop Pair Counter",
  difficulty: "intermediate",
  estimatedMinutes: 3,
  challengeType: "trace-variable",
  instructions: "One row was erased from the middle of the trace table. Fill the two missing cells (i value, then pairs value) in row order.",
  content: {
    language: "java",
    prompt: "Reconstruct the missing trace row for the inner loop.",
    code: "int pairs = 0;\nfor (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 2; j++) {\n        pairs++;\n    }\n}",
    trace: {
      columns: ["i", "j", "pairs"],
      rows: [
        { cells: ["0", "0", "1"] },
        { cells: ["0", "1", "2"] },
        { cells: ["1", "0", "3"] },
        { cells: ["?", "1", "?"], note: "second inner pass of the middle outer iteration" },
        { cells: ["2", "0", "5"] },
        { cells: ["2", "1", "6"] },
      ],
    },
    blanks: [
      { placeholder: "?", context: "i in the missing row" },
      { placeholder: "?", context: "pairs in the missing row" },
    ],
  },
  evaluation: { strategy: "fill-blanks", expectedBlanks: [["1"], ["4"]] },
  hints: [
    "The inner loop always runs both of its passes before i moves forward.",
    "pairs only ever increases by one, so the erased row must sit directly between the totals of its neighbors.",
  ],
  explanation: {
    concept: "Nested loop execution order",
    summary: "The missing row is i=1, j=1 with pairs=4; the outer loop finishes the j=1 pass before advancing i.",
    details: "For each i (0, 1, 2) the inner loop runs j=0 then j=1, so pairs increments six times total: 1, 2, 3, 4, 5, 6. The row after i=1, j=0 must still be inside the i=1 block, hence i stays 1 while j advances to 1 and pairs reaches 4.",
  },
  rewards: { xp: 21 },
  version: 1,
};
