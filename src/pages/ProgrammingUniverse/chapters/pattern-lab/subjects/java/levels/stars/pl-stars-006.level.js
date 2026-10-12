export default {
  "id": "pl-stars-006",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "stars",
  "levelNumber": 6,
  "title": "Checkerboard Star Grid",
  "difficulty": "intermediate",
  "estimatedMinutes": 3,
  "challengeType": "pattern-prediction",
  "instructions": "Use the parity of i + j to decide each cell, then choose the printed shape.",
  "content": {
    "language": "java",
    "prompt": "What does this code print?",
    "code": "for (int i = 1; i <= 4; i++) {\n    for (int j = 1; j <= 4; j++) {\n        if ((i + j) % 2 == 0) {\n            System.out.print(\"*\");\n        } else {\n            System.out.print(\" \");\n        }\n    }\n    System.out.println();\n}",
    "patternRows": [
      "* *",
      " * *",
      "* *",
      " * *"
    ]
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "alternating-rows"
  },
  "hints": [
    "When i is odd, the parity of i + j flips every column, and the next row starts from the opposite parity.",
    "A space cell still occupies one column, so rows are staggered rather than identical."
  ],
  "explanation": {
    "concept": "parity-based cell choice",
    "summary": "The sum i + j is even on exactly half the cells, and the even positions shift by one between consecutive rows, creating a checkerboard of stars.",
    "details": "For i=1: j=1 gives 2 (even, star), j=2 gives 3 (odd, space), j=3 gives 4 (star), j=4 gives 5 (space), so the row reads '* *'. For i=2 the roles swap and the row reads ' * *'. Each cell is one character wide with no separator."
  },
  "rewards": {
    "xp": 20
  },
  "version": 1
};
