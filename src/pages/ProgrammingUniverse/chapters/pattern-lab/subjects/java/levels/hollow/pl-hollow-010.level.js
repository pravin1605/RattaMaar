export default {
  "id": "pl-hollow-010",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "hollow",
  "levelNumber": 10,
  "title": "Fence Posts and Diagonal Beams",
  "difficulty": "advanced",
  "estimatedMinutes": 5,
  "challengeType": "predict-output",
  "instructions": "A hollow square combined with both diagonals: a cell prints a star when any border test or diagonal test holds. Choose the correct second line.",
  "content": {
    "language": "java",
    "prompt": "For n = 5, which string is line 2 of the output?",
    "code": "int n = 5;\nfor (int i = 1; i <= n; i++) {\n    for (int j = 1; j <= n; j++) {\n        if (i == 1 || i == n || j == 1 || j == n || j == i || j == n + 1 - i)\n            System.out.print(\"*\");\n        else\n            System.out.print(\".\");\n    }\n    System.out.println();\n}",
    "choices": [
      { "id": "altA", "label": "*.*.*" },
      { "id": "altB", "label": "**.**" },
      { "id": "altC", "label": ".*.*." }
    ],
    "patternRows": [
      "*****",
      "**.**",
      "*.*.*",
      "**.**",
      "*****"
    ],
    "expectedOutput": "*****\n**.**\n*.*.*\n**.**\n*****"
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "altB"
  },
  "hints": [
    "On any interior row the two side borders are already stars; ask which of the remaining columns the diagonal tests add.",
    "For row 2, evaluate j == i and j == n + 1 - i separately and mark every column they select."
  ],
  "explanation": {
    "concept": "combining border and diagonal predicates",
    "summary": "Row 2 keeps stars at both edge columns from the border tests, and the diagonal tests add columns 2 and 4, so only the center column stays a dot.",
    "details": "On row 2 the main diagonal hits j = 2 and the anti-diagonal hits j = 6 - 2 = 4. With the edges at j = 1 and j = 5, the lit columns are 1, 2, 4, 5, giving two adjacent stars, one dot, then two adjacent stars. Row 3 differs: both diagonals share the center while the edges stand alone, producing the alternating pattern."
  },
  "rewards": { "xp": 30 },
  "prerequisites": ["pl-hollow-009"],
  "version": 1
};
