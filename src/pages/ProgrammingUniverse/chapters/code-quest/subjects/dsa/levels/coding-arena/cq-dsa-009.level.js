export default {
  chapterId: "code-quest",
  id: "cq-dsa-009",
  subjectId: "dsa",
  modeId: "coding-arena",
  levelNumber: 9,
  title: "Seed the Two Pointers Correctly",
  difficulty: "advanced",
  estimatedMinutes: 4,
  challengeType: "fill-blanks",
  instructions: "Fill both blanks so the pointer scan works on the sorted array. Use the array's name and Java length expression where needed.",
  content: {
    language: "java",
    code: "int[] a = {1, 3, 5, 7};\nint target = 8, count = 0;\nint lo = ____;\nint hi = ____;\nwhile (lo < hi) {\n    int sum = a[lo] + a[hi];\n    if (sum == target) { count++; lo++; hi--; }\n    else if (sum < target) { lo++; }\n    else { hi--; }\n}\n// count = number of distinct pairs summing to target",
    blanks: [
      { placeholder: "____", context: "int lo = ____;" },
      { placeholder: "____", context: "int hi = ____;" },
    ],
  },
  evaluation: { strategy: "fill-blanks", expectedBlanks: [["0"], ["a.length - 1", "a.length-1", "3"]] },
  hints: [
    "Java indexes start at the first slot; the opposite end is one below the array's size.",
    "The scan must open with the outermost pair (smallest + largest) and converge inward, or sums can never shrink.",
  ],
  explanation: {
    concept: "Two-pointer pair-sum on a sorted array",
    summary: "lo starts at 0 and hi at a.length - 1. On {1,3,5,7} with target 8 the scan finds (1,7), then (3,5): count = 2.",
    details: "Because the array is sorted, sum too small means lo must rise and sum too large means hi must fall — each step discards a whole row/column of the pair matrix, so the scan is O(n) instead of the O(n^2) double loop. Moving both pointers on a hit avoids reusing an element in two pairs.",
  },
  rewards: { xp: 30 },
  version: 1,
};
