export default {
  "id": "pl-alpha-006",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "alphabets",
  "levelNumber": 6,
  "title": "Staircase Where Each Letter Carries Its Index",
  "difficulty": "intermediate",
  "estimatedMinutes": 3,
  "challengeType": "predict-output",
  "instructions": "The sample runs with n = 4. Predict one step further and type the row that a sixth iteration would print.",
  "content": {
    "language": "java",
    "prompt": "If the program is run with n = 6, type the sixth row exactly as it prints - one letter immediately followed by its index, with no spaces.",
    "code": "int n = 4;\nfor (int i = 1; i <= n; i++) {\n    for (int j = 1; j <= i; j++) {\n        System.out.print((char) ('A' + j - 1));\n        System.out.print(j);\n    }\n    System.out.println();\n}",
    "patternRows": [
      "A1",
      "A1B2",
      "A1B2C3",
      "A1B2C3D4"
    ],
    "patternVariables": [
      "i=1  j=1",
      "i=2  j=1..2",
      "i=3  j=1..3",
      "i=4  j=1..4"
    ],
    "expectedOutput": "A1\nA1B2\nA1B2C3\nA1B2C3D4",
    "answerLabel": "Sixth row",
    "answerPlaceholder": "letters and numbers with no spaces"
  },
  "evaluation": {
    "strategy": "structured-answer",
    "acceptedAnswers": [
      "A1B2C3D4E5F6"
    ]
  },
  "hints": [
    "Each inner iteration prints a pair, so the row length grows by two characters every time j advances.",
    "The letter offset and the printed digit come from the same counter j, which is why they always agree."
  ],
  "explanation": {
    "concept": "two print calls sharing one counter",
    "summary": "Row i prints i pairs, each pair being the letter for offset j and then the digit j itself.",
    "details": "print((char) ('A' + j - 1)) emits the letter while print(j) emits the same counter as a decimal number, and neither call adds a separator, so pairs run together. Extending to i = 6 gives the pairs A1, B2, C3, D4, E5, F6 in that order. Note that j starts at 1, so 'A' + j - 1 rather than 'A' + j is what keeps the first letter at A."
  },
  "rewards": {
    "xp": 24
  },
  "prerequisites": [
    "pl-alpha-005"
  ],
  "version": 1
};
