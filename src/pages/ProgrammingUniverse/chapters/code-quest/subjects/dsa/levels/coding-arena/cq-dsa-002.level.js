export default {
  chapterId: "code-quest",
  id: "cq-dsa-002",
  subjectId: "dsa",
  modeId: "coding-arena",
  levelNumber: 2,
  title: "How Many Probes to Find the Last Element?",
  difficulty: "beginner",
  estimatedMinutes: 3,
  challengeType: "numeric-answer",
  instructions: "Count how many array probes (probes++) the binary search performs before it finds the target 12.",
  content: {
    language: "java",
    code: "int[] a = {2, 4, 6, 8, 10, 12}; // sorted\nint target = 12, lo = 0, hi = a.length - 1, probes = 0;\nwhile (lo <= hi) {\n    int mid = (lo + hi) / 2;\n    probes++;\n    if (a[mid] == target) { break; }\n    else if (a[mid] < target) { lo = mid + 1; }\n    else { hi = mid - 1; }\n}",
  },
  evaluation: { strategy: "blank-count", expectedCount: 3 },
  hints: [
    "Each probe halves the window; track lo, hi and mid through the three rounds.",
    "Probe 1 lands on 6, which pushes lo to index 3. Keep going: the window [3..5] probes 10, then the last element.",
  ],
  explanation: {
    concept: "Binary search step counting",
    summary: "3 probes. mid = (0+5)/2 = 2 sees 6 (< 12) so lo = 3; mid = (3+5)/2 = 4 sees 10 (< 12) so lo = 5; mid = (5+5)/2 = 5 hits 12 and breaks.",
    details: "Integer division floors mid: (0+5)/2 = 2, not 2.5. Worst case is ceil(log2(n+1)) comparisons — for 6 elements that is 3 — versus up to 6 probes for a linear scan. Finding the LAST element is among the better paths; failing on an absent element costs the same 3 rounds here.",
  },
  rewards: { xp: 15 },
  version: 1,
};
