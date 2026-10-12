export default {
  id: "cq-sy-005",
  chapterId: "code-quest",
  subjectId: "java-fundamentals",
  modeId: "syntax-challenge",
  levelNumber: 5,
  title: "Inherit or Contract?",
  difficulty: "intermediate",
  estimatedMinutes: 3,
  challengeType: "fill-blanks",
  instructions: "Fill the two keywords: one links a class to its single superclass, the other lists interfaces whose contracts the class fulfills.",
  content: {
    language: "java",
    prompt: "A class can extend exactly one parent but implement many contracts.",
    code: "public class Dog ____ Animal ____ Pet, Trainable {\n    // body\n}",
    blanks: [
      { placeholder: "____", context: "public class Dog ____ Animal — the superclass link" },
      { placeholder: "____", context: "____ Pet, Trainable — the interface list introducer" },
    ],
  },
  evaluation: { strategy: "fill-blanks", expectedBlanks: [["extends"], ["implements"]] },
  hints: [
    "The superclass keyword reads as 'builds on top of'; only one such relationship is allowed.",
    "The other keyword reads as 'fulfill the requirements of' and precedes a comma-separated list.",
  ],
  explanation: {
    concept: "extends vs implements",
    summary: "extends attaches the single superclass; implements introduces the comma-separated interfaces the class must fulfill.",
    details: "Java allows one class inheritance chain but unlimited interface adoption, which is why the two spellings exist and appear in this fixed order. Forgetting to override an interface's abstract methods turns the class itself abstract — a compile error at use sites.",
  },
  rewards: { xp: 23 },
  version: 1,
};
