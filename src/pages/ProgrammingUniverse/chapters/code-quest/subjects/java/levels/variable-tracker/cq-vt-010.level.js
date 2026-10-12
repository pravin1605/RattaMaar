export default {
  id: "cq-vt-010",
  chapterId: "code-quest",
  subjectId: "java-fundamentals",
  modeId: "variable-tracker",
  levelNumber: 10,
  title: "Rolling Hash Recurrence",
  difficulty: "advanced",
  estimatedMinutes: 4,
  challengeType: "trace-variable",
  instructions: "The hash follows a multiply-and-add recurrence. Type the value that replaces the ? in the last row.",
  content: {
    language: "java",
    prompt: "What does hash hold after the final pass?",
    code: "int hash = 0;\nfor (int i = 0; i < 3; i++) {\n    hash = hash * 3 + (i + 1);\n}",
    trace: {
      columns: ["i", "hash"],
      rows: [
        { cells: ["0", "1"], note: "0 * 3 + 1" },
        { cells: ["1", "5"], note: "previous hash is scaled, then the 1-based position is added" },
        { cells: ["2", "?"], note: "last pass" },
      ],
    },
  },
  evaluation: { strategy: "structured-answer", acceptedAnswers: ["18"] },
  hints: [
    "Read the note on the second row and apply the same recurrence to the last row.",
    "Scale the previous total by the multiplier first, then add the position number counted from one.",
  ],
  explanation: {
    concept: "Rolling hash-style recurrence",
    summary: "Each pass multiplies the previous hash by 3 and adds the 1-based index, so the third pass produces 5 * 3 + 3.",
    details: "The recurrence h -> 3h + (i+1) gives 0 -> 1 -> 5 -> 18. This mirrors how real rolling hashes fold each new character into a growing value, which is why equal-length different inputs diverge quickly and collisions stay rare.",
  },
  rewards: { xp: 35 },
  version: 1,
};
