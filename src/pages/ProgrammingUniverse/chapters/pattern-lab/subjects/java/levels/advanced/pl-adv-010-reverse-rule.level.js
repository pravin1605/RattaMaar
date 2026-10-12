export default {
  "id": "pl-adv-010",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "advanced",
  "levelNumber": 10,
  "title": "Reverse the Rule: Which Formula Draws This Grid?",
  "difficulty": "advanced",
  "estimatedMinutes": 5,
  "challengeType": "pattern-prediction",
  "instructions": "Work backwards from the printed grid: test each candidate formula on row 1 and row 2 and choose the one that matches everywhere.",
  "content": {
    "language": "java",
    "prompt": "A program prints value-expression(i, j) for row i and column j, each on its own row of three numbers. Which formula produces exactly this output?",
    "code": "for (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= 3; j++) {\n        System.out.print(EXPRESSION);\n        if (j < 3) System.out.print(\" \");\n    }\n    System.out.println();\n}",
    "patternRows": [
      "2 4 6",
      "3 6 9",
      "4 8 12"
    ],
    "choices": [
      { "id": "rule-product", "label": "i * j" },
      { "id": "rule-shifted-product", "label": "(i + 1) * j" },
      { "id": "rule-sum", "label": "i + j" },
      { "id": "rule-double", "label": "i * j * 2" }
    ]
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "rule-shifted-product"
  },
  "hints": [
    "Row 1 is not 1 times anything: its first entry is 2, so the multiplier for the row must be bigger than the row index itself.",
    "Test candidates on two cells at once, for example (row 1, column 3) and (row 3, column 2); a formula that fits every printed value is the rule."
  ],
  "explanation": {
    "concept": "reverse-engineering a pattern rule from its output",
    "summary": "Each row k lists multiples of k + 1: row 1 is 2 4 6, row 2 is 3 6 9, row 3 is 4 8 12, so the value printed is (i + 1) * j.",
    "details": "Multiplication-table grids have a constant ratio across each row; here row 1's step is 2, row 2's step is 3 and row 3's step is 4, which is the column multiplier j against the shifted row factor i + 1. i * j fails at the very first cell (it would print 1), i + j gives the additive pattern 2 3 4 on row 1, and i * j * 2 doubles row 2 into 6 12 18. When reverse-engineering, compare the row's step size against the row index instead of guessing from the first value alone."
  },
  "rewards": { "xp": 35 },
  "version": 1
};
