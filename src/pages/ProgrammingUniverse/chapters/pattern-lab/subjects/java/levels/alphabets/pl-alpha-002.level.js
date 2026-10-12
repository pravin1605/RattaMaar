export default {
  "id": "pl-alpha-002",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "alphabets",
  "levelNumber": 2,
  "title": "ABC Triangle: Every Row Restarts at A",
  "difficulty": "beginner",
  "estimatedMinutes": 2,
  "challengeType": "predict-output",
  "instructions": "Trace the outer loop row by row, then decide what the inner loop prints on each row.",
  "content": {
    "language": "java",
    "prompt": "The inner loop counter j is reset to 0 at the start of every row. What does the whole program print?",
    "code": "int n = 3;\nfor (int i = 1; i <= n; i++) {\n    for (int j = 0; j < i; j++) {\n        System.out.print((char) ('A' + j));\n    }\n    System.out.println();\n}",
    "patternRows": [
      "A",
      "AB",
      "ABC"
    ],
    "patternVariables": [
      "i=1  j=0",
      "i=2  j=0,1",
      "i=3  j=0,1,2"
    ],
    "expectedOutput": "A\nAB\nABC",
    "choices": [
      {
        "id": "restart-a",
        "label": "A on row 1, AB on row 2, ABC on row 3 - each row begins again at A"
      },
      {
        "id": "repeat-letter",
        "label": "A on row 1, BB on row 2, CCC on row 3 - each row repeats its own letter"
      },
      {
        "id": "keeps-advancing",
        "label": "A on row 1, BC on row 2, DEF on row 3 - the letter never resets"
      }
    ]
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "restart-a"
  },
  "hints": [
    "The inner loop is declared inside the outer loop, so its counter starts from the same place on every row.",
    "j, not i, decides how far the character code moves away from the alphabet's first letter."
  ],
  "explanation": {
    "concept": "character offset from a loop counter",
    "summary": "Because j restarts at 0 each row, every row prints letters from A up to the letter whose offset is i - 1.",
    "details": "Row i runs j = 0 .. i-1, and (char) ('A' + j) turns the offset back into a letter, so row i prints i letters starting at A. Adding an int to a char produces an int, which is why the cast is needed; without it the program would print numeric code values. println only moves to the next row, it never resets the letters."
  },
  "rewards": {
    "xp": 15
  },
  "prerequisites": [
    "java-pattern-alpha-001"
  ],
  "version": 1
};
