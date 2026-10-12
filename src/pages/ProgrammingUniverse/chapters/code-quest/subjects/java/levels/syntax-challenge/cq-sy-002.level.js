export default {
  id: "cq-sy-002",
  chapterId: "code-quest",
  subjectId: "java-fundamentals",
  modeId: "syntax-challenge",
  levelNumber: 2,
  title: "Resizing the Number Shelf",
  difficulty: "beginner",
  estimatedMinutes: 2,
  challengeType: "fill-blanks",
  instructions: "Fill the two blanks so the declaration creates an array that can hold six values and the assignment writes into its very first slot.",
  content: {
    language: "java",
    prompt: "Array sizes are written inside square brackets at creation; valid positions start counting at the lowest index.",
    code: "int[] nums = new int[____];\nnums[____] = 42; // store into the FIRST slot",
    blanks: [
      { placeholder: "____", context: "new int[____] — how many slots the array holds" },
      { placeholder: "____", context: "nums[____] = 42 — the index of the first slot" },
    ],
  },
  evaluation: { strategy: "fill-blanks", expectedBlanks: [["6"], ["0"]] },
  hints: [
    "The capacity must match the number of values the task says the array should hold.",
    "Java positions are counted starting from the smallest whole number, not from one.",
  ],
  explanation: {
    concept: "Array declaration and zero-based indexing",
    summary: "new int[6] allocates six slots and the first element lives at index 0, so valid indices run 0 through 5.",
    details: "The bracket at creation fixes the capacity permanently; arrays have no resize. Because counting starts at 0, writing nums[6] in a length-6 array throws ArrayIndexOutOfBoundsException — the canonical off-by-one error.",
  },
  rewards: { xp: 17 },
  version: 1,
};
