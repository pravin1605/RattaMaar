export default {
  chapterId: "code-quest",
  id: "cq-dsa-007",
  subjectId: "dsa",
  modeId: "coding-arena",
  levelNumber: 7,
  title: "Unwind the Factorial Call Chain",
  difficulty: "intermediate",
  estimatedMinutes: 4,
  challengeType: "trace-variable",
  instructions: "Complete the recursion trace table and enter the value fact(4) returns.",
  content: {
    language: "java",
    code: "static int fact(int n) {\n    if (n <= 1) return 1;\n    return n * fact(n - 1);\n}\n// main:\nSystem.out.println(fact(4));",
    trace: {
      columns: ["call", "base case?", "returns"],
      rows: [
        { cells: ["fact(4)", "no", "4 * fact(3)"], note: "waits on the deeper call" },
        { cells: ["fact(3)", "no", "3 * fact(2)"], note: "waits on the deeper call" },
        { cells: ["fact(2)", "no", "2 * fact(1)"], note: "waits on the deeper call" },
        { cells: ["fact(1)", "yes", "1"], note: "n <= 1 stops the chain" },
        { cells: ["unwind", "-", "2, 6, 24"], note: "2*1, then 3*2, then 4*6" },
      ],
    },
  },
  evaluation: { strategy: "numeric-tolerance", expectedNumber: 24 },
  hints: [
    "The base case stops the descent at 1; every pending frame then multiplies by its own n on the way back up.",
    "Unwind bottom-up: 1, then 1*2, then 2*3, and the last waiting frame still has one more multiplier to apply.",
  ],
  explanation: {
    concept: "Recursion trace (factorial)",
    summary: "fact(4) = 24. The calls descend fact(4)->fact(3)->fact(2)->fact(1); the base case returns 1 and the frames return 2, 6 and finally 24.",
    details: "Each frame stores its own n on the call stack, so depth is 4 and space is O(n) before unwinding. The return expression n * fact(n-1) evaluates the recursive call first, which is why nothing multiplies until fact(1) answers. Forgetting n <= 1 causes StackOverflowError because n-1 never reaches the base.",
  },
  rewards: { xp: 25 },
  version: 1,
};
