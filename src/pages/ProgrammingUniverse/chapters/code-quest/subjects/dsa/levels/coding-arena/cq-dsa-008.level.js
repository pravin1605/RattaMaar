export default {
  chapterId: "code-quest",
  id: "cq-dsa-008",
  subjectId: "dsa",
  modeId: "coding-arena",
  levelNumber: 8,
  title: "The Sort That Never Has a Bad Day",
  difficulty: "advanced",
  estimatedMinutes: 4,
  challengeType: "multiple-choice",
  instructions: "Choose the algorithm that guarantees O(n log n) even on the worst possible input.",
  content: {
    language: "java",
    prompt: "Which comparison sort has O(n log n) WORST-case time complexity?",
    choices: [
      { id: "a", label: "Quicksort with a fixed first-element pivot" },
      { id: "b", label: "Merge sort" },
      { id: "c", label: "Bubble sort" },
      { id: "d", label: "Insertion sort" },
    ],
  },
  evaluation: { strategy: "single-choice", correctChoiceId: "b" },
  hints: [
    "Two of the candidates degrade to quadratic on reverse-sorted or already-sorted input.",
    "The winner always splits into halves and always merges in linear time, no matter how the data is arranged.",
  ],
  explanation: {
    concept: "Time complexity of sorting algorithms",
    summary: "Merge sort: it divides the array in halves (log n levels) and merges each level in O(n), giving O(n log n) in best, average and worst cases alike.",
    details: "Quicksort with a fixed first pivot is O(n^2) on sorted input because partitions come out maximally unbalanced (randomised/median-of-three pivots fix this in practice). Bubble and insertion sort are Theta(n^2) worst case (insertion is O(n) on nearly-sorted data). Merge sort's price is O(n) auxiliary space — the classic time-for-space trade.",
  },
  rewards: { xp: 30 },
  version: 1,
};
