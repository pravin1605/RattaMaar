export default {
  chapterId: "code-quest",
  id: "cq-dsa-003",
  subjectId: "dsa",
  modeId: "coding-arena",
  levelNumber: 3,
  title: "Count the Bubble Sort Swaps",
  difficulty: "beginner",
  estimatedMinutes: 3,
  challengeType: "predict-output",
  instructions: "The variable swaps is printed after both passes. Enter the printed number.",
  content: {
    language: "java",
    code: "int[] a = {5, 1, 4};\nint swaps = 0;\nfor (int i = 0; i < a.length - 1; i++) {\n    for (int j = 0; j < a.length - 1 - i; j++) {\n        if (a[j] > a[j + 1]) {\n            int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;\n            swaps++;\n        }\n    }\n}\nSystem.out.println(swaps);",
  },
  evaluation: { strategy: "blank-count", expectedCount: 2 },
  hints: [
    "Count one swap every time two neighbours are in the wrong order.",
    "Pass 0 bubbles the largest value to the end with two adjacent exchanges; pass 1 finds the remaining pair already ordered.",
  ],
  explanation: {
    concept: "Bubble sort adjacent swaps",
    summary: "Prints 2. Pass i=0: swap(5,1) -> {1,5,4}, swap(5,4) -> {1,4,5}; pass i=1 compares (1,4) and does nothing.",
    details: "The number of bubble-sort swaps equals the number of inversions — here (5,1) and (5,4). j stops at a.length-2-i so the sorted tail is never re-inspected. On already-sorted input the count is 0, which is why an early-exit flag makes best case O(n).",
  },
  rewards: { xp: 18 },
  version: 1,
};
