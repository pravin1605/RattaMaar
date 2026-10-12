export default {
  "id": "pl-pyr-001",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "pyramids",
  "levelNumber": 1,
  "title": "Filled Star Pyramid: Padding Plus Odd Widths",
  "difficulty": "beginner",
  "estimatedMinutes": 2,
  "challengeType": "predict-output",
  "instructions": "Read the three inner loops in order and choose the figure the program draws.",
  "content": {
    "language": "java",
    "prompt": "Row i prints n - i spaces and then 2 * i - 1 stars. What is printed for n = 4?",
    "code": "int n = 4;\nfor (int i = 1; i <= n; i++) {\n    for (int s = i; s < n; s++) System.out.print(\" \");\n    for (int j = 1; j <= 2 * i - 1; j++) System.out.print(\"*\");\n    System.out.println();\n}",
    "patternRows": [
      "   *",
      "  ***",
      " *****",
      "*******"
    ],
    "patternVariables": [
      "i=1  spaces=3  stars=1",
      "i=2  spaces=2  stars=3",
      "i=3  spaces=1  stars=5",
      "i=4  spaces=0  stars=7"
    ],
    "expectedOutput": "   *\n  ***\n *****\n*******",
    "choices": [
      {
        "id": "centred-pyramid",
        "label": "One star on row 1, then three, five and seven stars, each row shifted one space further left"
      },
      {
        "id": "left-triangle",
        "label": "One star, then two, three and four stars, all flush with the left margin"
      },
      {
        "id": "solid-rectangle",
        "label": "Seven stars on every row, because the star loop always reaches 2 * n - 1"
      }
    ]
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "centred-pyramid"
  },
  "hints": [
    "The padding loop starts at the current row number, so it has fewer trips as the rows go down.",
    "The star loop bound is an expression in i, which means the widths grow by two each row rather than by one."
  ],
  "explanation": {
    "concept": "centring by trading padding for width",
    "summary": "Each row loses one leading space and gains two stars, so the odd widths 1, 3, 5, 7 stay centred over the base.",
    "details": "For row i the padding loop runs while s < n with s starting at i, giving n - i spaces. The star loop runs j = 1 .. 2 * i - 1, an odd count, so the row total width is (n - i) + (2i - 1) which grows steadily to the full base width 2n - 1. Nothing is printed after the last star, so no row carries trailing spaces."
  },
  "rewards": {
    "xp": 15
  },
  "version": 1
};
