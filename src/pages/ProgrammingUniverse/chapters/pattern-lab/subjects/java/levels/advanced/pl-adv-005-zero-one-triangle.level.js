export default {
  "id": "pl-adv-005",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "advanced",
  "levelNumber": 5,
  "title": "The 0-1 Triangle: Parity of the Column",
  "difficulty": "intermediate",
  "estimatedMinutes": 3,
  "challengeType": "pattern-prediction",
  "instructions": "Predict the fifth row of the printed 0-1 triangle.",
  "content": {
    "language": "java",
    "prompt": "Each printed bit is j % 2, where j counts the position inside the row. Which is the fifth row of this triangle?",
    "code": "for (int i = 1; i <= 5; i++) {\n    for (int j = 1; j <= i; j++) {\n        System.out.print(j % 2);\n        if (j < i) System.out.print(\" \");\n    }\n    System.out.println();\n}",
    "patternRows": [
      "1",
      "1 0",
      "1 0 1",
      "1 0 1 0"
    ],
    "choices": [
      { "id": "zeroone-alt", "label": "1 0 1 0 1" },
      { "id": "zeroone-all-one", "label": "1 1 1 1 1" },
      { "id": "zeroone-shift", "label": "0 1 0 1 0" },
      { "id": "zeroone-repeat", "label": "1 0 1 0" }
    ]
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "zeroone-alt"
  },
  "hints": [
    "The printed bit depends only on the position j inside the row, never on the row number i.",
    "j % 2 is 1 for odd positions and 0 for even ones; the fifth row simply extends the same alternating run by one more cell."
  ],
  "explanation": {
    "concept": "parity-based 0-1 triangle",
    "summary": "Because every row starts at j = 1, each row begins with 1 and alternates 0, 1, ...; the fifth row is 1 0 1 0 1.",
    "details": "j % 2 gives 1 exactly when j is odd, so positions 1, 3, 5 print 1 and positions 2, 4 print 0 in every row. The pattern is column-driven, not row-driven: if the code printed (i + j) % 2 instead, rows would start with different bits and the triangle would look staggered (that is the 0 1 0 1 0 distractor). The space guard j < i keeps rows free of trailing blanks."
  },
  "rewards": { "xp": 20 },
  "version": 1
};
