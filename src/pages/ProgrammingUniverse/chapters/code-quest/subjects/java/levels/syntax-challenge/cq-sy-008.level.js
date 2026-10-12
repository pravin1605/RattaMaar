export default {
  id: "cq-sy-008",
  chapterId: "code-quest",
  subjectId: "java-fundamentals",
  modeId: "syntax-challenge",
  levelNumber: 8,
  title: "Chaining the Mutable String",
  difficulty: "intermediate",
  estimatedMinutes: 3,
  challengeType: "fill-blanks",
  instructions: "Complete the mutable-string setup: the type being instantiated and the method called twice in a chain.",
  content: {
    language: "java",
    prompt: "The chain adds two more fragments to the seed text \"Hi\".",
    code: "StringBuilder sb = new ____(\"Hi\");\nsb.____(\"!\").____(\"?\");",
    blanks: [
      { placeholder: "____", context: "new ____(\"Hi\") — the mutable character-sequence class" },
      { placeholder: "____", context: "sb.____(\"!\") — the first call in the chain" },
      { placeholder: "____", context: ".____(\"?\") — the second call, possible because the first returns the builder itself" },
    ],
  },
  evaluation: { strategy: "fill-blanks", expectedBlanks: [["StringBuilder", "stringbuilder"], ["append"], ["append"]] },
  hints: [
    "The class name pairs a mutable container with the word for text; it is created with new, unlike String literals.",
    "The chained method's name means 'add to the end', and it returns this so calls can stack with dots.",
  ],
  explanation: {
    concept: "StringBuilder and method chaining",
    summary: "new StringBuilder(seed) creates a mutable buffer, and append returns the builder itself, enabling dotted chains.",
    details: "String concatenation with + allocates a new object each time; StringBuilder mutates one buffer, which is why loops that build text should append. The fluent return (return this) is the same trick used by the chain here — every call hands back the object so the next dot continues.",
  },
  rewards: { xp: 29 },
  version: 1,
};
