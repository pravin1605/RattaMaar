export default {
  "id": "pl-stars-004",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "stars",
  "levelNumber": 4,
  "title": "Solid Square of Stars",
  "difficulty": "beginner",
  "estimatedMinutes": 2,
  "challengeType": "predict-output",
  "instructions": "Both loops run the same number of times. Type the exact output the program prints.",
  "content": {
    "language": "java",
    "prompt": "Type the output, one row per line:",
    "code": "for (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= 3; j++) {\n        System.out.print(\"* \");\n    }\n    System.out.println();\n}",
    "patternRows": [
      "* * *",
      "* * *",
      "* * *"
    ],
    "expectedOutput": "* * *\n* * *\n* * *"
  },
  "evaluation": {
    "strategy": "structured-answer",
    "acceptedAnswers": [
      "* * *\n* * *\n* * *"
    ]
  },
  "hints": [
    "The inner loop bound no longer depends on i, so every row prints the same number of stars.",
    "Count the cells: rows times columns. A square has equal width and height."
  ],
  "explanation": {
    "concept": "square grid with a constant inner bound",
    "summary": "Because the inner loop always runs 3 times regardless of i, each row prints 3 stars, producing a 3x3 square rather than a triangle.",
    "details": "In the left triangle the inner bound was j <= i. Here it is j <= 3, so row 1 already prints three stars. print(\"* \") adds a space separator; the trailing space of each line is not visible."
  },
  "rewards": {
    "xp": 16
  },
  "version": 1
};
