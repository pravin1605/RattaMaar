export default {
  id: "cq-sy-009",
  chapterId: "code-quest",
  subjectId: "java-fundamentals",
  modeId: "syntax-challenge",
  levelNumber: 9,
  title: "Delegate Sideways, Delegate Upward",
  difficulty: "advanced",
  estimatedMinutes: 4,
  challengeType: "fill-blanks",
  instructions: "Both constructors delegate instead of duplicating code. Fill the two delegation keywords (each used as a call).",
  content: {
    language: "java",
    prompt: "One delegation targets a sibling constructor of the same class; the other invokes the direct parent's constructor.",
    code: "public class Cat extends Animal {\n    public Cat() {\n        ____(\"gray\");\n    }\n    public Cat(String color) {\n        ____();\n        this.color = color;\n    }\n}",
    blanks: [
      { placeholder: "____", context: "no-argument constructor delegating to the String overload of THIS class" },
      { placeholder: "____", context: "first statement of the second constructor, invoking the PARENT class constructor" },
    ],
  },
  evaluation: { strategy: "fill-blanks", expectedBlanks: [["this"], ["super"]] },
  hints: [
    "The self-reference keyword is a four-letter word pointing sideways to a sibling constructor.",
    "The parent keyword names the superclass relationship and must sit as the very first statement of the constructor that uses it.",
  ],
  explanation: {
    concept: "Constructor chaining with this() and super()",
    summary: "this(\"gray\") delegates to the other constructor of the same class, while super() invokes the parent's no-argument constructor first.",
    details: "A delegating call must be the first statement of a constructor; otherwise the compiler implicitly inserts a parent call there. Chain order matters: the object's initialization climbs from Object downward, so super() runs before the rest of the body executes. Omitting both keywords still compiles because a hidden parent no-argument call is injected — it only fails when the parent lacks one.",
  },
  rewards: { xp: 32 },
  version: 1,
};
