export default {
  id: "cq-vt-008",
  chapterId: "code-quest",
  subjectId: "java-fundamentals",
  modeId: "variable-tracker",
  levelNumber: 8,
  title: "Postfix Then Prefix, Who Bumps First?",
  difficulty: "intermediate",
  estimatedMinutes: 3,
  challengeType: "trace-variable",
  instructions: "Two cells in the final row were hidden. Fill both missing values in column order (y, then z).",
  content: {
    language: "java",
    prompt: "Track x, y and z through the two increment statements.",
    code: "int x = 5;\nint y = x++;\nint z = ++x;",
    trace: {
      columns: ["statement", "x", "y", "z"],
      rows: [
        { cells: ["int x = 5", "5", "-", "-"] },
        { cells: ["y = x++", "6", "5", "-"], note: "postfix assigns the old value, then bumps x" },
        { cells: ["z = ++x", "7", "?", "?"], note: "prefix bumps x first, then assigns" },
      ],
    },
    blanks: [
      { placeholder: "?", context: "y in the final row" },
      { placeholder: "?", context: "z in the final row" },
    ],
  },
  evaluation: { strategy: "fill-blanks", expectedBlanks: [["5"], ["7"]] },
  hints: [
    "A variable that is never re-assigned keeps the value from the row above.",
    "Prefix increment changes the variable before reading it; the read value and the stored value are identical.",
  ],
  explanation: {
    concept: "Prefix vs postfix increment",
    summary: "y received x's value before it was bumped, and z receives x's value after another bump, so y and z differ by two.",
    details: "y = x++ stores 5 in y and leaves x at 6. z = ++x first raises x to 7, then stores 7 in z. The y column never changes after its single assignment, so the final row repeats its original value while z shows the freshly bumped one.",
  },
  rewards: { xp: 29 },
  version: 1,
};
