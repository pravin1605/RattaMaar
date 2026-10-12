export default {
  "id": "pl-stars-010",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "stars",
  "levelNumber": 10,
  "title": "Filled Pyramid of Stars",
  "difficulty": "advanced",
  "estimatedMinutes": 4,
  "challengeType": "predict-output",
  "instructions": "Combine the space loop with the odd-length star loop, then type the exact output for n = 4.",
  "content": {
    "language": "java",
    "prompt": "Type the pyramid exactly, one row per line:",
    "code": "int n = 4;\nfor (int i = 1; i <= n; i++) {\n    for (int s = 1; s <= n - i; s++) {\n        System.out.print(\" \");\n    }\n    for (int j = 1; j <= 2 * i - 1; j++) {\n        System.out.print(\"*\");\n    }\n    System.out.println();\n}",
    "patternRows": [
      "   *",
      "  ***",
      " *****",
      "*******"
    ],
    "expectedOutput": "   *\n  ***\n *****\n*******"
  },
  "evaluation": {
    "strategy": "structured-answer",
    "acceptedAnswers": [
      "   *\n  ***\n *****\n*******"
    ]
  },
  "hints": [
    "Row i has an odd star count given by twice the row number minus one, and the indentation shrinks in step with it.",
    "The apex must be centered: with n = 4 the last row is the widest and needs no leading spaces."
  ],
  "explanation": {
    "concept": "centered pyramid from spaces and odd star counts",
    "summary": "Row i prints n-i spaces then 2i-1 stars, so each row grows by two stars while the indent shrinks by one, keeping the peak centered.",
    "details": "For i=1: 3 spaces and 1 star. For i=2: 2 spaces and 3 stars. Row 3 has 1 space and 5 stars, row 4 has 0 spaces and 7 stars. Growing by two stars while indenting by one space less keeps the left edge sliding exactly half a star-width, which is what makes the triangle symmetric."
  },
  "rewards": {
    "xp": 30
  },
  "version": 1
};
