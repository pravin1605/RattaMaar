export default {
  "id": "pl-adv-006",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "advanced",
  "levelNumber": 6,
  "title": "Binary Pyramid: Complete the Padding Loop",
  "difficulty": "intermediate",
  "estimatedMinutes": 3,
  "challengeType": "code-completion",
  "instructions": "Fill the blank so every row is centred and the printed output matches the visualizer.",
  "content": {
    "language": "java",
    "prompt": "Row i prints 2*i - 1 alternating bits; the width grows by two per row. How many leading spaces must the padding loop print for the pyramid to stay centred?",
    "code": "int rows = 3;\nfor (int i = 1; i <= rows; i++) {\n    for (int s = 1; s <= ____; s++) {\n        System.out.print(\" \");\n    }\n    for (int j = 1; j <= 2 * i - 1; j++) {\n        System.out.print(j % 2);\n    }\n    System.out.println();\n}",
    "patternRows": [
      "  1",
      " 101",
      "10101"
    ],
    "blanks": [
      { "placeholder": "____", "context": "for (int s = 1; s <= ____; s++) {" }
    ]
  },
  "evaluation": {
    "strategy": "fill-blanks",
    "expectedBlanks": [["rows - i", "rows-i"]]
  },
  "hints": [
    "The widest row is the last one and needs no padding; the first row needs the most blanks.",
    "Count blanks per row from the picture: 2, then 1, then 0 as i goes 1, 2, 3 — express that gap using rows and i."
  ],
  "explanation": {
    "concept": "centred pyramid from two inner loops",
    "summary": "The blank is rows - i: the last row prints no spaces and each row above it adds one more leading blank, keeping the bit run centred.",
    "details": "The bottom row is the widest at 2*rows - 1 = 5 characters, and row i is 2*i - 1 characters wide, so the total horizontal slack is 2*(rows - i). A printed line ends at its last bit, so all of that slack sits on the left: rows - i blanks, giving 2 on row 1, 1 on row 2 and none on row 3. The bit loop is independent: j % 2 alternates 1, 0, 1, ... starting at 1 because j begins at 1. Writing i - 1 instead would build an upside-down pyramid."
  },
  "rewards": { "xp": 22 },
  "version": 1
};
