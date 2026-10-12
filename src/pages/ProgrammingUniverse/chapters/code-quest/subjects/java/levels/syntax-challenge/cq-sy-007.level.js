export default {
  id: "cq-sy-007",
  chapterId: "code-quest",
  subjectId: "java-fundamentals",
  modeId: "syntax-challenge",
  levelNumber: 7,
  title: "Wiring Up the Keyboard Reader",
  difficulty: "intermediate",
  estimatedMinutes: 3,
  challengeType: "fill-blanks",
  instructions: "Restore the console-input setup: the directive that pulls in the type, the type being constructed, and the method that reads a whole number.",
  content: {
    language: "java",
    prompt: "Reading an int from System.in needs three pieces in this exact order.",
    code: "____ java.util.Scanner;\n\nScanner sc = new ____ (System.in);\nint n = sc.____();",
    blanks: [
      { placeholder: "____", context: "____ java.util.Scanner; — the file-header directive" },
      { placeholder: "____", context: "Scanner sc = new ____ (System.in); — the constructor name" },
      { placeholder: "____", context: "int n = sc.____(); — the call that consumes an integer token" },
    ],
  },
  evaluation: { strategy: "fill-blanks", expectedBlanks: [["import"], ["Scanner", "scanner"], ["nextInt", "nextint"]] },
  hints: [
    "The directive lives above the class body and names the fully qualified type.",
    "Two of the blanks come from the same tool class; the third is its method that returns a primitive whole-number type.",
  ],
  explanation: {
    concept: "Importing and using Scanner",
    summary: "Scanner lives in java.util, so it must be imported; the variable type and constructor both use the same class, and nextInt() consumes an integer token.",
    details: "Without the import (or a fully qualified name) the compiler cannot resolve Scanner. nextInt() skips whitespace then parses digits; if the next token is not a valid integer it throws InputMismatchException. Mixing nextInt() with nextLine() is a common follow-up pitfall because the leftover newline is not consumed.",
  },
  rewards: { xp: 27 },
  version: 1,
};
