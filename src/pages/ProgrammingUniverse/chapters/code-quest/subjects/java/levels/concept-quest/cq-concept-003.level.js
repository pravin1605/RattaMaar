export default {
  chapterId: "code-quest",
  id: "cq-concept-003",
  subjectId: "java-fundamentals",
  modeId: "concept-quest",
  levelNumber: 3,
  title: "Same Parameters, New Return Type — Legal Overload?",
  difficulty: "beginner",
  estimatedMinutes: 3,
  challengeType: "true-false",
  instructions: "Decide whether the snippet compiles as valid overloading.",
  content: {
    language: "java",
    code: "class Printer {\n    int print(int x) { return x; }\n    double print(int x) { return x / 2.0; }\n}",
    prompt: "True or false: these two methods form a valid overloaded pair in one class.",
    choices: [
      { id: "true", label: "True" },
      { id: "false", label: "False" },
    ],
  },
  evaluation: { strategy: "single-choice", correctChoiceId: "false" },
  hints: [
    "The return type is never part of a method signature for dispatch — the parameter list is.",
    "If both bodies could coexist, what would the call print(5) be supposed to bind to?",
  ],
  explanation: {
    concept: "Overloading vs overriding",
    summary: "False. Overloading requires a different parameter list (type, number, or order); changing only the return type does not create an overload and the class fails to compile with a duplicate-method error.",
    details: "Overload resolution uses the name plus argument types, so two methods differing only by return type are indistinguishable at the call site (print(5) could match both). Contrast with overriding: the subclass keeps the SAME signature and may narrow the return type (covariant returns) or change access/throws in allowed ways — the return type is only ever the modifier of an override, never the differentiator of an overload.",
  },
  rewards: { xp: 18 },
  version: 1,
};
