export default {
  "id": "pl-hollow-002",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "hollow",
  "levelNumber": 2,
  "title": "Frame It: Hollow Rectangle Border",
  "difficulty": "beginner",
  "estimatedMinutes": 2,
  "challengeType": "predict-output",
  "instructions": "Study the code, trace which cells print a star, then choose the correct output.",
  "content": {
    "language": "java",
    "prompt": "What is printed for rows = 4 and cols = 6?",
    "code": "int rows = 4;\nint cols = 6;\nfor (int i = 1; i <= rows; i++) {\n    for (int j = 1; j <= cols; j++) {\n        if (i == 1 || i == rows || j == 1 || j == cols)\n            System.out.print(\"*\");\n        else\n            System.out.print(\" \");\n    }\n    System.out.println();\n}",
    "choices": [
      { "id": "border", "label": "Full star rows on top and bottom; the two middle rows show one star at each end with spaces between" },
      { "id": "filled", "label": "A star in every one of the 24 cells" },
      { "id": "twolines", "label": "Stars only on the first and last rows, all spaces in between" }
    ],
    "patternRows": [
      "******",
      "*    *",
      "*    *",
      "******"
    ],
    "expectedOutput": "******\n*    *\n*    *\n******"
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "border"
  },
  "hints": [
    "A cell prints a star only when it touches an edge of the grid: check the top, bottom, left, and right tests.",
    "The two interior rows still print the loop's first and last columns as stars; only the middle cells become spaces."
  ],
  "explanation": {
    "concept": "hollow border condition in nested loops",
    "summary": "The OR condition marks the first row, last row, first column, and last column as stars; every other cell prints a space.",
    "details": "i == 1 || i == rows selects the full top and bottom lines. j == 1 || j == cols keeps a star at both ends of each middle line. The inner loop still runs cols times per row, so each line is 6 characters wide before trailing spaces are ignored."
  },
  "rewards": { "xp": 15 },
  "version": 1
};
