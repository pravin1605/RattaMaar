export default {
  id: "cq-sy-006",
  chapterId: "code-quest",
  subjectId: "java-fundamentals",
  modeId: "syntax-challenge",
  levelNumber: 6,
  title: "Calling the Math Toolbox",
  difficulty: "intermediate",
  estimatedMinutes: 3,
  challengeType: "fill-blanks",
  instructions: "Static utility methods are invoked through their class name. Fill both call sites.",
  content: {
    language: "java",
    prompt: "Both calls use the same java.lang utility class, referenced with a dot.",
    code: "double d = ____.sqrt(16);\nint m = ____.max(2, 9);",
    blanks: [
      { placeholder: "____", context: "____.sqrt(16) — the class providing the square-root helper" },
      { placeholder: "____", context: "____.max(2, 9) — the same class providing the larger-of-two helper" },
    ],
  },
  evaluation: { strategy: "fill-blanks", expectedBlanks: [["Math", "math"], ["Math", "math"]] },
  hints: [
    "This java.lang class shares its name with the school subject about numbers.",
    "Static members are addressed as ClassName.member(...) with no object creation involved.",
  ],
  explanation: {
    concept: "Static method invocation",
    summary: "Utility methods like sqrt and max belong to the java.lang.Math class and are called directly on the class name.",
    details: "Math is final with a private constructor — it exists only as a namespace for static functions, exactly the pattern these calls use. java.lang is imported automatically, so the class name alone is legal without any import statement.",
  },
  rewards: { xp: 25 },
  version: 1,
};
