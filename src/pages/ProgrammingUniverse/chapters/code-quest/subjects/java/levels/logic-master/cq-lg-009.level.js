export default {
  id: "cq-lg-009",
  chapterId: "code-quest",
  subjectId: "java-fundamentals",
  modeId: "logic-master",
  levelNumber: 9,
  title: "Parity of a Negative Number",
  difficulty: "advanced",
  estimatedMinutes: 3,
  challengeType: "predict-output",
  instructions: "Predict exactly which word this program prints for the negative input. Type the word.",
  content: {
    language: "java",
    prompt: "The odd/even test uses a specific remainder value. What is printed?",
    code: "int n = -7;\nif (n % 2 == 1) {\n    System.out.println(\"odd\");\n} else {\n    System.out.println(\"even\");\n}",
  },
  evaluation: { strategy: "structured-answer", acceptedAnswers: ["even"] },
  hints: [
    "In Java the remainder takes the sign of the dividend, not the divisor.",
    "Compute -7 % 2 exactly, then compare that result against the positive literal used in the test.",
  ],
  explanation: {
    concept: "Modulo with negative operands",
    summary: "-7 % 2 evaluates to -1 in Java, which is not equal to 1, so the buggy test labels the number as even.",
    details: "Java's % keeps the sign of the left operand: -7 % 2 == -1. The classic parity idiom n % 2 == 1 therefore misclassifies negative odd numbers. The robust test is n % 2 != 0, which is true for every odd integer regardless of sign.",
  },
  rewards: { xp: 33 },
  version: 1,
};
