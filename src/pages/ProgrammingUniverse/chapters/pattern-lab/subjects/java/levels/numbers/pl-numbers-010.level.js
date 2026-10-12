export default {
  "id": "pl-numbers-010",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "numbers",
  "levelNumber": 10,
  "title": "Centered Number Pyramid 1-2-3-2-1",
  "difficulty": "advanced",
  "estimatedMinutes": 5,
  "challengeType": "predict-output",
  "instructions": "Three inner loops per row: indentation, an ascending run, then a descending run. Type the exact output for rows = 4.",
  "content": {
    "language": "java",
    "prompt": "Type the pyramid, one row per line (keep the leading spaces):",
    "code": "int rows = 4;\nfor (int i = 1; i <= rows; i++) {\n    for (int s = 1; s <= rows - i; s++) {\n        System.out.print(\"  \");\n    }\n    for (int j = 1; j < i; j++) {\n        System.out.print(j + \" \");\n    }\n    for (int j = i; j >= 1; j--) {\n        System.out.print(j + \" \");\n    }\n    System.out.println();\n}",
    "patternRows": [
      "      1",
      "    1 2 1",
      "  1 2 3 2 1",
      "1 2 3 4 3 2 1"
    ],
    "expectedOutput": "      1\n    1 2 1\n  1 2 3 2 1\n1 2 3 4 3 2 1"
  },
  "evaluation": {
    "strategy": "structured-answer",
    "acceptedAnswers": [
      "      1\n    1 2 1\n  1 2 3 2 1\n1 2 3 4 3 2 1"
    ]
  },
  "hints": [
    "The ascending loop stops before i, and the descending loop starts at i, so the peak value is printed exactly once per row.",
    "Each indent step is two spaces wide because the number-plus-space token is two characters long."
  ],
  "explanation": {
    "concept": "two-phase number pyramid",
    "summary": "Row i prints 2*(rows-i) spaces, then counts up 1 to i-1 and back down from i to 1, making a symmetric pyramid whose peak equals the row number.",
    "details": "j < i (strict) in the ascending loop prevents the peak from printing twice when the descending loop starts at j = i. The space loop prints two characters per step, matching the width of a printed number and its separator, which keeps the pyramid centered. For i=4 the indent loop runs zero times, so the base touches column 1."
  },
  "rewards": {
    "xp": 28
  },
  "version": 1
};
