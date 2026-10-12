export default {
  "id": "pl-hollow-004",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "hollow",
  "levelNumber": 4,
  "title": "Two Diagonals Make an X",
  "difficulty": "beginner",
  "estimatedMinutes": 3,
  "challengeType": "predict-output",
  "instructions": "Reason about the two diagonal conditions, then choose the correct output.",
  "content": {
    "language": "java",
    "prompt": "What is the printed grid for n = 5?",
    "code": "int n = 5;\nfor (int i = 1; i <= n; i++) {\n    for (int j = 1; j <= n; j++) {\n        if (j == i || j == n - i + 1)\n            System.out.print(\"*\");\n        else\n            System.out.print(\".\");\n    }\n    System.out.println();\n}",
    "choices": [
      { "id": "cross", "label": "Stars run from both top corners toward the center and meet at a single star in the middle row" },
      { "id": "onediag", "label": "Stars only along the top-left to bottom-right diagonal, dots everywhere else" },
      { "id": "nodots", "label": "Two stars on every row, never fewer" }
    ],
    "patternRows": [
      "*...*",
      ".*.*.",
      "..*..",
      ".*.*.",
      "*...*"
    ],
    "expectedOutput": "*...*\n.*.*.\n..*..\n.*.*.\n*...*"
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "cross"
  },
  "hints": [
    "The second test j == n - i + 1 is the mirror diagonal: as the row grows, its star column moves left.",
    "Check the middle row: both conditions become true for the same column, so the two diagonals share one cell."
  ],
  "explanation": {
    "concept": "symmetric diagonal conditions",
    "summary": "j == i draws the main diagonal and j == n - i + 1 draws the anti-diagonal; their union forms an X.",
    "details": "On row i the anti-diagonal sits at column n - i + 1, so its star marches leftward while the main diagonal's star marches rightward. At i = 3 both resolve to column 3, collapsing the row to a single center star, and every other cell prints a dot."
  },
  "rewards": { "xp": 18 },
  "prerequisites": ["pl-hollow-003"],
  "version": 1
};
