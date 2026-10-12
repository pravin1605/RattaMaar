export default {
  "id": "pl-hollow-003",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "hollow",
  "levelNumber": 3,
  "title": "Complete the Hollow Right Triangle",
  "difficulty": "beginner",
  "estimatedMinutes": 3,
  "challengeType": "code-completion",
  "instructions": "Fill the two blanks so the loop prints the hollow right triangle shown in the preview.",
  "content": {
    "language": "java",
    "prompt": "The triangle keeps its left edge (j == 1), its slanted edge (j == i), and a full base row. Complete the missing loop bound and the missing condition term.",
    "code": "int n = 4;\nfor (int i = 1; i <= n; i++) {\n    for (int j = 1; j <= ____; j++) {\n        if (j == 1 || j == i || ____ == n) {\n            System.out.print(\"*\");\n        } else {\n            System.out.print(\" \");\n        }\n    }\n    System.out.println();\n}",
    "blanks": [
      { "placeholder": "____", "context": "for (int j = 1; j <= ____; j++) — the row grows in step with the outer loop" },
      { "placeholder": "____", "context": "if (j == 1 || j == i || ____ == n) — the base test compares the row counter with n" }
    ],
    "patternRows": [
      "*",
      "**",
      "* *",
      "****"
    ],
    "expectedOutput": "*\n**\n* *\n****"
  },
  "evaluation": {
    "strategy": "fill-blanks",
    "expectedBlanks": ["i", "i"]
  },
  "hints": [
    "Each row contains exactly as many cells as the row number, so the inner bound is the outer loop variable.",
    "Only the last outer pass should print a full base of stars; compare the row counter itself with n."
  ],
  "explanation": {
    "concept": "row-dependent inner bound plus border tests",
    "summary": "Both blanks hold the outer loop variable: the inner loop runs j from 1 to i, and the base row is detected with i == n.",
    "details": "With j <= i the printed width grows one cell per row. Inside that width, j == 1 paints the left edge, j == i paints the slanted hypotenuse, and i == n turns the final row completely solid. Rows 1 and 2 look solid because their edges coincide."
  },
  "rewards": { "xp": 16 },
  "prerequisites": ["pl-hollow-002"],
  "version": 1
};
