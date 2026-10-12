export default {
  "id": "pl-stars-005",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "stars",
  "levelNumber": 5,
  "title": "Hollow Square Frame",
  "difficulty": "intermediate",
  "estimatedMinutes": 3,
  "challengeType": "code-completion",
  "instructions": "Complete the missing if-condition so that only the border cells print stars and the inside stays blank.",
  "content": {
    "language": "java",
    "prompt": "Which condition prints stars only on the frame of the square?",
    "code": "int n = 4;\nfor (int i = 1; i <= n; i++) {\n    for (int j = 1; j <= n; j++) {\n        if (____) {\n            System.out.print(\"* \");\n        } else {\n            System.out.print(\"  \");\n        }\n    }\n    System.out.println();\n}",
    "missingLine": "if (____) { System.out.print(\"* \"); } else { System.out.print(\"  \"); }",
    "patternRows": [
      "* * * *",
      "*     *",
      "*     *",
      "* * * *"
    ],
    "expectedOutput": "* * * *\n*     *\n*     *\n* * * *"
  },
  "evaluation": {
    "strategy": "structured-answer",
    "acceptedAnswers": [
      "i == 1 || i == n || j == 1 || j == n",
      "i==1||i==n||j==1||j==n",
      "i == 1 || j == 1 || i == n || j == n",
      "j == 1 || j == n || i == 1 || i == n"
    ]
  },
  "hints": [
    "A cell belongs to the frame when it sits on the first or last row, or on the first or last column.",
    "Compare i and j with the extreme values their loops take, and join the four checks with the short-circuiting operator for 'or'."
  ],
  "explanation": {
    "concept": "border test with four disjunctive conditions",
    "summary": "The frame consists of every cell where i is at either row extreme or j is at either column extreme, so the condition ORs four equality checks.",
    "details": "Row 1 and row n make the top and bottom edges; column 1 and column n make the sides. Interior cells fail all four checks and print two spaces, carving the hole. The target shape shows the completed frame for n = 4."
  },
  "rewards": {
    "xp": 20
  },
  "version": 1
};
