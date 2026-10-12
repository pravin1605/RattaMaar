export default {
  "id": "java-pattern-binary-003",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "levelNumber": 1,
  "title": "Binary Alternation",
  "difficulty": "beginner",
  "estimatedMinutes": 2,
  "challengeType": "predict-output",
  "instructions": "Study the example, reason through the loop logic, then choose the correct answer.",
  "content": {
    "language": "java",
    "prompt": "The program runs with rows = 4 and columns = 4. What does it print?",
    "choices": [
      {
        "id": "alt",
        "label": "Rows alternate: \"1 0 1 0\", then \"0 1 0 1\", and so on"
      },
      {
        "id": "all1",
        "label": "Every row prints \"1 1 1 1\""
      },
      {
        "id": "all0",
        "label": "Every row prints \"0 0 0 0\""
      }
    ],
    "code": "for (int i = 1; i <= 4; i++) {\n    for (int j = 1; j <= 4; j++) {\n        System.out.print((i + j) % 2 == 0 ? \"1\" : \"0\");\n        System.out.print(\" \");\n    }\n    System.out.println();\n}",
    "patternRows": [
      "1 0 1 0",
      "0 1 0 1",
      "1 0 1 0",
      "0 1 0 1"
    ],
    "expectedOutput": "1 0 1 0\n0 1 0 1\n1 0 1 0\n0 1 0 1"
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "alt"
  },
  "hints": [
    "Trace the outer loop first, then count what the inner loop prints.",
    "Use the row number and the loop condition to check the number of iterations."
  ],
  "explanation": {
    "concept": "modulo and parity",
    "summary": "A parity check using modulo 2 can alternate between two values.",
    "details": "An even or odd result of i + j determines which digit is printed."
  },
  "rewards": {
    "xp": 20
  },
  "version": 1,
  "categoryId": "advanced"
};
