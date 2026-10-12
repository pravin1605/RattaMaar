export default {
  chapterId: "code-quest",
  id: "cq-concept-008",
  subjectId: "java-fundamentals",
  modeId: "concept-quest",
  levelNumber: 8,
  title: "Two Equal Strings That Are Not the Same Object",
  difficulty: "intermediate",
  estimatedMinutes: 4,
  challengeType: "predict-output",
  instructions: "Predict exactly what the program prints (two words separated by one space).",
  content: {
    language: "java",
    code: "String a = \"hi\";\nString b = new String(\"hi\");\nSystem.out.println((a == b) + \" \" + a.equals(b)); // ?",
    expectedOutput: "false true",
  },
  evaluation: { strategy: "exact-output", expectedOutput: "false true" },
  hints: [
    "Reference equality and content equality ask two different questions.",
    "The constructor call allocates a fresh object instead of reusing the pool constant.",
  ],
  explanation: {
    concept: "String pool, == vs equals()",
    summary: "Prints 'false true'. The literal \"hi\" is interned in the string pool; new String(\"hi\") creates a separate heap object, so == is false while equals() is true.",
    details: "== compares references (same object identity). equals() compares character content. b.intern() would return the pooled object, making b.intern() == a true. Rule: always use equals() (or contentEquals) to compare string values; == is only meaningful when you deliberately want identity, e.g. pool exploitation — which is why the compiler can make two identical literals share one object.",
  },
  rewards: { xp: 25 },
  version: 1,
};
