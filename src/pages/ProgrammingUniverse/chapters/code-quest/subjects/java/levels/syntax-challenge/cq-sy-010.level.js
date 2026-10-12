export default {
  id: "cq-sy-010",
  chapterId: "code-quest",
  subjectId: "java-fundamentals",
  modeId: "syntax-challenge",
  levelNumber: 10,
  title: "Declaring a Fixed Set of Values",
  difficulty: "advanced",
  estimatedMinutes: 4,
  challengeType: "fill-blanks",
  instructions: "Restore the enum type keyword and the exact qualified constant reference.",
  content: {
    language: "java",
    prompt: "The declaration needs its special type keyword; the reference must qualify the constant with its enum type name.",
    code: "public ____ Month { JAN, FEB, MAR }\n\nMonth current = Month.____;",
    blanks: [
      { placeholder: "____", context: "public ____ Month { ... } — the keyword that declares a fixed constant type" },
      { placeholder: "____", context: "Month current = Month.____; — pick the FIRST constant of the list" },
    ],
  },
  evaluation: { strategy: "fill-blanks", expectedBlanks: [["enum"], ["JAN", "jan"]] },
  hints: [
    "The declaration keyword is a four-letter abbreviation for 'enumeration'.",
    "Enum constants are referenced through the type name, and the prompt numbers them by declaration order — the first one wins.",
  ],
  explanation: {
    concept: "enum declarations and qualified constants",
    summary: "enum declares a type whose instances are exactly the listed constants, referenced as TypeName.CONSTANT.",
    details: "Each constant is a public static final member of implicit type Month, and enum types compile with an intrinsic ordinal() order matching their declaration list. Because constants are conventionally uppercase, Month.JAN is valid while bare JAN is not — the qualifier anchors the constant to its type.",
  },
  rewards: { xp: 35 },
  version: 1,
};
