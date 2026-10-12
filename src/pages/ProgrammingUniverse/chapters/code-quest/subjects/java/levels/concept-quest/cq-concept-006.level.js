export default {
  chapterId: "code-quest",
  id: "cq-concept-006",
  subjectId: "java-fundamentals",
  modeId: "concept-quest",
  levelNumber: 6,
  title: "One Counter Shared by Every Instance",
  difficulty: "intermediate",
  estimatedMinutes: 3,
  challengeType: "predict-output",
  instructions: "Predict exactly what the program prints (a single value).",
  content: {
    language: "java",
    code: "class Counter {\n    static int count = 0;\n    Counter() { count++; }\n}\n// in main:\nnew Counter(); new Counter(); new Counter();\nSystem.out.println(Counter.count); // ?",
    expectedOutput: "3",
  },
  evaluation: { strategy: "exact-output", expectedOutput: "3" },
  hints: [
    "The constructor runs once per object, and each run touches one shared piece of state.",
    "A field marked with the class-level keyword belongs to the class itself, not to any single instance.",
  ],
  explanation: {
    concept: "static vs instance members",
    summary: "Prints 3. The static field count exists once per class, so all three constructor calls increment the same variable.",
    details: "Instance fields get a fresh copy per object; static fields are shared storage accessed through the class. If count were a non-static field, Counter.count would not even compile (no instance context) and each object would hold its own 1. This is why static is used for counters, registries, and utility state — and why it is also a common source of cross-test interference.",
  },
  rewards: { xp: 22 },
  version: 1,
};
