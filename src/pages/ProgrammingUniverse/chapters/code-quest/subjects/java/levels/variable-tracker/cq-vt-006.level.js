export default {
  id: "cq-vt-006",
  chapterId: "code-quest",
  subjectId: "java-fundamentals",
  modeId: "variable-tracker",
  levelNumber: 6,
  title: "Classic Three-Cup Swap",
  difficulty: "beginner",
  estimatedMinutes: 2,
  challengeType: "trace-variable",
  instructions: "Two cells were hidden while simulating the swap line by line. Fill both missing values in table order.",
  content: {
    language: "java",
    prompt: "Track how the swap exchanges the two variables.",
    code: "int a = 3;\nint b = 7;\nint temp = a;\na = b;\nb = temp;",
    trace: {
      columns: ["line executed", "a", "b", "temp"],
      rows: [
        { cells: ["declarations", "3", "7", "-"] },
        { cells: ["temp = a", "3", "7", "3"], note: "temp copies the original a" },
        { cells: ["a = b", "?", "7", "3"], note: "a is overwritten" },
        { cells: ["b = temp", "7", "?", "3"], note: "b receives the preserved copy" },
      ],
    },
    blanks: [
      { placeholder: "?", context: "a in the row for a = b" },
      { placeholder: "?", context: "b in the row for b = temp" },
    ],
  },
  evaluation: { strategy: "fill-blanks", expectedBlanks: [["7"], ["3"]] },
  hints: [
    "Without temp, overwriting a would destroy the only copy of its original value.",
    "After the last line, each variable holds the other variable's starting value.",
  ],
  explanation: {
    concept: "Swapping via a temporary variable",
    summary: "temp preserves a's original value so a can take b's value and b can then take the preserved one.",
    details: "temp = a copies the first original value. a = b then safely overwrites a. Finally b = temp restores the first variable's original value into b, completing the exchange. This is the canonical swap used inside sorting algorithms.",
  },
  rewards: { xp: 25 },
  version: 1,
};
