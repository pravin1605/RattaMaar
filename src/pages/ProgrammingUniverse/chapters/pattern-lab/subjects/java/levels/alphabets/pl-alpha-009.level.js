export default {
  "id": "pl-alpha-009",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "alphabets",
  "levelNumber": 9,
  "title": "Character Count Rows: How Many Letters Total?",
  "difficulty": "intermediate",
  "estimatedMinutes": 3,
  "challengeType": "numeric-answer",
  "instructions": "Each row repeats one letter, but only the row's own letter. Count the total number of characters this program sends to the console.",
  "content": {
    "language": "java",
    "prompt": "How many characters do the print calls produce in total? Count letters only, not the line breaks made by println.",
    "code": "int n = 4;\nfor (int i = 1; i <= n; i++) {\n    for (int j = 1; j <= i; j++) {\n        System.out.print((char) ('A' + i - 1));\n    }\n    System.out.println();\n}",
    "patternRows": [
      "A",
      "BB",
      "CCC",
      "DDDD"
    ],
    "patternVariables": [
      "i=1  letters=1  (A)",
      "i=2  letters=2  (B)",
      "i=3  letters=3  (C)",
      "i=4  letters=4  (D)"
    ],
    "expectedOutput": "A\nBB\nCCC\nDDDD",
    "answerLabel": "Total characters",
    "answerPlaceholder": "type a whole number",
    "answerRows": 1
  },
  "evaluation": {
    "strategy": "blank-count",
    "expectedCount": 10
  },
  "hints": [
    "The letter choice depends on the row, but the number of letters depends on the inner counter's range.",
    "Add the inner-loop trip counts for every row; a triangular total appears when the row counts grow one by one."
  ],
  "explanation": {
    "concept": "counting inner-loop iterations",
    "summary": "Row i executes its print call i times, so the totals are 1 + 2 + 3 + 4 = 10 characters.",
    "details": "The inner loop runs j = 1 .. i, giving i characters per row, and the letter stays fixed within a row because only i, not j, feeds the character offset. println moves the cursor to a new line but writes no counted character. Recognising the 1 + 2 + ... + n pattern matters more here than the letters themselves: for any n the total is n * (n + 1) / 2."
  },
  "rewards": {
    "xp": 28
  },
  "prerequisites": [
    "pl-alpha-008"
  ],
  "version": 1
};
