export default {
  "id": "pl-stars-008",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "stars",
  "levelNumber": 8,
  "title": "Fix the Star Cross",
  "difficulty": "intermediate",
  "estimatedMinutes": 3,
  "challengeType": "find-and-fix",
  "instructions": "The program should print a plus sign: a full middle row of stars and a full middle column of stars, on a 5x5 grid. It prints only a single star. Choose the fix.",
  "content": {
    "language": "java",
    "prompt": "Which correction turns the lone center star into a complete cross?",
    "code": "int mid = 3;\nfor (int i = 1; i <= 5; i++) {\n    for (int j = 1; j <= 5; j++) {\n        if (i == mid && j == mid) {\n            System.out.print(\"* \");\n        } else {\n            System.out.print(\"  \");\n        }\n    }\n    System.out.println();\n}",
    "choices": [
      {
        "id": "use-or",
        "label": "Replace && with || in the if-condition, so a star prints when either coordinate is the middle one."
      },
      {
        "id": "use-println",
        "label": "Change the inner System.out.print(\"* \") into System.out.println(\"*\")."
      },
      {
        "id": "shorten-loop",
        "label": "Change the inner loop bound to j <= mid."
      }
    ]
  },
  "evaluation": {
    "strategy": "validated-correction",
    "expectedFixId": "use-or"
  },
  "hints": [
    "The middle row needs stars in every column; the middle column needs stars in every row. A cell only has to satisfy one of those two requirements.",
    "With &&, a cell must satisfy both sides at once. Which Java operator means 'at least one side is true'?"
  ],
  "explanation": {
    "concept": "AND versus OR in a border-style test",
    "summary": "A cross is the union of the middle row and the middle column, so the test must accept cells where i == mid OR j == mid; && accepts only their single intersection.",
    "details": "With &&, only (3,3) passes, giving one star. With ||, row 3 passes for every j (a full horizontal bar) and column 3 passes for every i (a vertical bar), drawing the plus sign. The other fixes change line breaks or width and still miss the arms of the cross."
  },
  "rewards": {
    "xp": 24
  },
  "version": 1
};
