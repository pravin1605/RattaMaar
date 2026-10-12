export default {
  "id": "pl-numbers-004",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "numbers",
  "levelNumber": 4,
  "title": "Floyd's Triangle: One Endless Counter",
  "difficulty": "beginner",
  "estimatedMinutes": 2,
  "challengeType": "pattern-prediction",
  "instructions": "The counter lives outside both loops. Decide how it advances as rows grow, then choose the output.",
  "content": {
    "language": "java",
    "prompt": "What does this code print for rows = 4?",
    "code": "int rows = 4;\nint num = 1;\nfor (int i = 1; i <= rows; i++) {\n    for (int j = 1; j <= i; j++) {\n        System.out.print(num + \" \");\n        num++;\n    }\n    System.out.println();\n}",
    "patternRows": [
      "1",
      "2 3",
      "4 5 6",
      "7 8 9 10"
    ],
    "expectedOutput": "1\n2 3\n4 5 6\n7 8 9 10",
    "choices": [
      {
        "id": "keeps-counting",
        "label": "Numbers keep rising across rows: 1 / 2 3 / 4 5 6 / 7 8 9 10"
      },
      {
        "id": "restarts",
        "label": "Every row restarts at 1: 1 / 1 2 / 1 2 3 / 1 2 3 4"
      },
      {
        "id": "fixed-width",
        "label": "Each row prints exactly four numbers"
      }
    ]
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "keeps-counting"
  },
  "hints": [
    "Ask where num is initialized: inside a loop it would reset, but here it never does.",
    "Row i prints i numbers, so after row 3 the counter has already passed six values."
  ],
  "explanation": {
    "concept": "persistent counter across nested loops",
    "summary": "num is declared once before the loops and incremented after every print, so the natural numbers flow continuously into rows of growing length: this is Floyd's triangle.",
    "details": "Row 1 consumes 1, row 2 consumes 2 and 3, row 3 consumes 4 to 6, row 4 consumes 7 to 10. A single counter shared by all iterations is what distinguishes Floyd's triangle from per-row restarting patterns."
  },
  "rewards": {
    "xp": 16
  },
  "version": 1
};
