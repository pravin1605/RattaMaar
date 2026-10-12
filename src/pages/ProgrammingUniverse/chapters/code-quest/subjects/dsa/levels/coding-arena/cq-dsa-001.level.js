export default {
  chapterId: "code-quest",
  id: "cq-dsa-001",
  subjectId: "dsa",
  modeId: "coding-arena",
  levelNumber: 1,
  title: "Trace the Running Maximum",
  difficulty: "beginner",
  estimatedMinutes: 2,
  challengeType: "trace-variable",
  instructions: "Follow the trace table and enter the final value printed by the program.",
  content: {
    language: "java",
    code: "int[] a = {3, 7, 2};\nint max = a[0];\nfor (int i = 1; i < a.length; i++) {\n    if (a[i] > max) { max = a[i]; }\n}\nSystem.out.println(max);",
    trace: {
      columns: ["step", "i", "a[i]", "max"],
      rows: [
        { cells: ["init", "-", "-", "3"], note: "max = a[0]" },
        { cells: ["iter 1", "1", "7", "7"], note: "7 > 3, so max is replaced" },
        { cells: ["iter 2", "2", "2", "7"], note: "2 > 7 is false, max unchanged" },
        { cells: ["print", "-", "-", "7"], note: "loop ends at i == 3" },
      ],
    },
  },
  evaluation: { strategy: "numeric-tolerance", expectedNumber: 7 },
  hints: [
    "max only changes when the scanned element is strictly greater than it.",
    "Compare each of the two loop passes with the starting value a[0]; the smallest element never wins.",
  ],
  explanation: {
    concept: "Linear scan for array maximum",
    summary: "Prints 7. The loop starts at index 1 because index 0 already seeded max; it replaces max only on 7, and 2 never qualifies.",
    details: "This is the O(n) max pattern: one invariant — max always holds the largest value seen so far. Seeding with a[0] avoids the trap of seeding with 0 (wrong for all-negative arrays) and saves the first comparison. a.length = 3 so the loop body runs twice.",
  },
  rewards: { xp: 15 },
  version: 1,
};
