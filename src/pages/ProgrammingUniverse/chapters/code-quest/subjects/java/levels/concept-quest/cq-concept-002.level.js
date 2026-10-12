export default {
  chapterId: "code-quest",
  id: "cq-concept-002",
  subjectId: "java-fundamentals",
  modeId: "concept-quest",
  levelNumber: 2,
  title: "Which Modifier Serves Subclasses in Other Packages?",
  difficulty: "beginner",
  estimatedMinutes: 2,
  challengeType: "fill-in-blank",
  instructions: "Complete the sentence with the name of one Java access modifier (lowercase, no code).",
  content: {
    language: "java",
    code: "class Alpha {\n    int samePackageOnly;\n    private int onlyInsideAlpha;\n    // one more level: visible to subclasses in other packages,\n    // and to the whole same package\n}",
    prompt: "A member must be invisible to unrelated classes in the same package EXCEPT it must be visible to the whole same package and to subclasses located in another package. It is the ______ modifier.",
  },
  evaluation: { strategy: "structured-answer", acceptedAnswers: ["protected"] },
  hints: [
    "You want a member that unrelated classes in the same package CAN see, and outside classes can see only through inheritance.",
    "Of the four access levels, exactly one is named after inheritance rather than after a package.",
  ],
  explanation: {
    concept: "Access modifier table (private / default / protected / public)",
    summary: "protected is visible within the same package and additionally to subclasses in other packages; default (package-private) stops at the package boundary, and private never leaves the class.",
    details: "The table: private = same class only; no modifier (package-private) = same class + same package; protected = same class + same package + subclasses in other packages (via inheritance); public = everywhere the class is reachable. Subtle point: package-private classes in the same package canNOT see a protected-only contract as an unrelated collaborator unless they extend the owner — protected is the level that widens access exactly for subclasses across packages.",
  },
  rewards: { xp: 15 },
  version: 1,
};
