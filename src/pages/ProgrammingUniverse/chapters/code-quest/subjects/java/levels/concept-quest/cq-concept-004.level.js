export default {
  chapterId: "code-quest",
  id: "cq-concept-004",
  subjectId: "java-fundamentals",
  modeId: "concept-quest",
  levelNumber: 4,
  title: "Abstract Class or Interface? Count the Supertypes",
  difficulty: "intermediate",
  estimatedMinutes: 3,
  challengeType: "multiple-choice",
  instructions: "Choose the statement that is correct about abstract classes and interfaces in modern Java.",
  content: {
    language: "java",
    code: "abstract class Shape {\n    Shape() { /* constructor allowed */ }\n    abstract double area();\n    String kind = \"shape\"; // instance state\n}\ninterface Movable { void move(); }\ninterface Paintable { void paint(); }",
    prompt: "Which statement is correct?",
    choices: [
      { id: "a", label: "A class can implement many interfaces but extend at most one class, abstract or not." },
      { id: "b", label: "Abstract classes cannot contain any implemented methods." },
      { id: "c", label: "Interface methods can never have a body." },
      { id: "d", label: "Interfaces can declare per-instance fields like classes do." },
    ],
  },
  evaluation: { strategy: "single-choice", correctChoiceId: "a" },
  hints: [
    "Consider how many supertypes may follow the implements keyword versus the extends keyword.",
    "One form of reuse allows only a single inheritance edge; the other allows any number of capability edges."],
  explanation: {
    concept: "Abstract class vs interface",
    summary: "A class extends at most one class (single inheritance) but can implement any number of interfaces — option A.",
    details: "Abstract classes MAY have implemented (concrete) methods, constructors, and instance fields, which is precisely why they model 'is-a with shared state'. Since Java 8, interfaces may carry default and static methods with bodies, so option C is outdated; however, interface fields are implicitly public static final constants, never per-instance state, so D is wrong. Rule of thumb: abstract class = shared identity/state, interface = plug-in capability contracts.",
  },
  rewards: { xp: 20 },
  version: 1,
};
