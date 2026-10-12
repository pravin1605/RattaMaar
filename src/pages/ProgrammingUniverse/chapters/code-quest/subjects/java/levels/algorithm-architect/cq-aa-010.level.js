export default {
  id: "cq-aa-010",
  chapterId: "code-quest",
  subjectId: "java-fundamentals",
  modeId: "algorithm-architect",
  levelNumber: 10,
  title: "Seal the Off-by-One at the Border",
  difficulty: "advanced",
  estimatedMinutes: 5,
  challengeType: "fill-blanks",
  instructions: "This summation must include every element exactly once. Fill the loop guard operator and the body's compound assignment.",
  content: {
    language: "java",
    prompt: "The last legal index is one below the length; the body folds the current element into the running total.",
    code: "int[] arr = {3, 1, 4, 1, 5};\nint total = 0;\nfor (int i = 0; i ____ arr.length; i++) {\n    total ____ arr[i];\n}",
    blanks: [
      { placeholder: "____", context: "i ____ arr.length — the guard that keeps i inside the array" },
      { placeholder: "____", context: "total ____ arr[i] — the fused read-add-store that accumulates" },
    ],
  },
  evaluation: { strategy: "fill-blanks", expectedBlanks: [["<"], ["+=", "+ ="]] },
  hints: [
    "The guard must reject the index that equals the length — that border position is where the exception lives.",
    "Plain assignment alone cannot accumulate; the operator must both read the old total and store the enlarged one in one statement.",
  ],
  explanation: {
    concept: "Off-by-one prevention and compound assignment",
    summary: "The half-open guard i < arr.length covers indices 0 through length-1, and += folds each element into the accumulator.",
    details: "Using <= here would try to read arr[5] in an array of five slots and throw ArrayIndexOutOfBoundsException, while starting at 1 or ending early drops elements — the three classic off-by-one variants. total += arr[i] is shorthand for total = total + arr[i]; writing only = would overwrite the total with the current element instead of accumulating, the same failure traced in the reset-bug level.",
  },
  rewards: { xp: 35 },
  version: 1,
};
