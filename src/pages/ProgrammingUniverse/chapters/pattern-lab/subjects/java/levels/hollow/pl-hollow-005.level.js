export default {
  "id": "pl-hollow-005",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "hollow",
  "levelNumber": 5,
  "title": "Count the Stars in a Plus Sign",
  "difficulty": "beginner",
  "estimatedMinutes": 3,
  "challengeType": "numeric-answer",
  "instructions": "Trace the counter and enter the number the program prints.",
  "content": {
    "language": "java",
    "prompt": "How many stars does the counter report for a 5 x 5 plus sign?",
    "code": "int n = 5;\nint mid = (n + 1) / 2;\nint stars = 0;\nfor (int i = 1; i <= n; i++) {\n    for (int j = 1; j <= n; j++) {\n        if (i == mid || j == mid) {\n            System.out.print(\"*\");\n            stars++;\n        } else {\n            System.out.print(\".\");\n        }\n    }\n    System.out.println();\n}\nSystem.out.println(\"stars = \" + stars);",
    "patternRows": [
      "..*..",
      "..*..",
      "*****",
      "..*..",
      "..*.."
    ],
    "expectedOutput": "..*..\n..*..\n*****\n..*..\n..*.."
  },
  "evaluation": {
    "strategy": "numeric-tolerance",
    "expectedNumber": 9,
    "tolerance": 0
  },
  "hints": [
    "The middle row prints a star in every column; the remaining rows each contribute only their middle column.",
    "Add the horizontal bar and the vertical bar, then subtract the center cell, which both tests claim."
  ],
  "explanation": {
    "concept": "counting cells that satisfy an OR condition",
    "summary": "The center row contributes a full width of stars and each of the other rows contributes exactly one, for a total of 9.",
    "details": "i == mid lights all 5 columns of row 3. j == mid lights one column in each of the remaining 4 rows. Integer division makes mid = (5 + 1) / 2 = 3. The counter increments inside the OR branch only, so dots are never counted."
  },
  "rewards": { "xp": 18 },
  "prerequisites": ["pl-hollow-004"],
  "version": 1
};
