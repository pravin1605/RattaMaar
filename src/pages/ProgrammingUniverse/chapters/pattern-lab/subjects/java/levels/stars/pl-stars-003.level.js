export default {
  "id": "pl-stars-003",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "stars",
  "levelNumber": 3,
  "title": "Right-Aligned Star Staircase",
  "difficulty": "beginner",
  "estimatedMinutes": 2,
  "challengeType": "pattern-prediction",
  "instructions": "Trace both inner loops row by row, then choose the output the code prints.",
  "content": {
    "language": "java",
    "prompt": "What does this code print for n = 4?",
    "code": "int n = 4;\nfor (int i = 1; i <= n; i++) {\n    for (int j = 1; j <= n - i; j++) {\n        System.out.print(\" \");\n    }\n    for (int k = 1; k <= i; k++) {\n        System.out.print(\"*\");\n    }\n    System.out.println();\n}",
    "patternRows": [
      "   *",
      "  **",
      " ***",
      "****"
    ],
    "expectedOutput": "   *\n  **\n ***\n****",
    "choices": [
      {
        "id": "right-aligned",
        "label": "Stars grow 1, 2, 3, 4 while leading spaces shrink, so the triangle hugs the right edge"
      },
      {
        "id": "left-aligned",
        "label": "Stars grow 1, 2, 3, 4 starting at column 1 with no leading spaces"
      },
      {
        "id": "centered",
        "label": "A centered pyramid with odd star counts 1, 3, 5, 7"
      }
    ]
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "right-aligned"
  },
  "hints": [
    "The first inner loop runs n minus the row number times, so early rows start further to the right.",
    "The second inner loop prints exactly i stars with no separator, then the line break moves to the next row."
  ],
  "explanation": {
    "concept": "leading spaces plus a growing star block",
    "summary": "Row i prints n-i spaces followed by i stars, so the hypotenuse is flush with the right side instead of the left.",
    "details": "For i=1 the space loop runs 3 times and the star loop once. Each new row loses one leading space and gains one star, so the block shifts left while growing. The star loop prints without separators, so stars touch each other."
  },
  "rewards": {
    "xp": 15
  },
  "version": 1
};
