export default {
  "id": "pl-stars-009",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "stars",
  "levelNumber": 9,
  "title": "Wave of Symbols: Order the Loops",
  "difficulty": "advanced",
  "estimatedMinutes": 4,
  "challengeType": "code-ordering",
  "instructions": "Arrange the blocks so the program cycles through the symbol array diagonally and prints a wave pattern of 4 rows.",
  "content": {
    "language": "java",
    "prompt": "Order the blocks so the program compiles and prints the diagonal wave.",
    "code": "String[] symbols = {\"*\", \"#\", \"@\"};\nfor (int i = 0; i < 4; i++) {\n    for (int j = 0; j < 7; j++) {\n        System.out.print(symbols[(i + j) % 3] + \" \");\n    }\n    System.out.println();\n}",
    "blocks": [
      {
        "id": "blk-outer",
        "code": "for (int i = 0; i < 4; i++) {"
      },
      {
        "id": "blk-print",
        "code": "        System.out.print(symbols[(i + j) % 3] + \" \");"
      },
      {
        "id": "blk-decl",
        "code": "String[] symbols = {\"*\", \"#\", \"@\"};"
      },
      {
        "id": "blk-endl",
        "code": "    }\n    System.out.println();"
      },
      {
        "id": "blk-inner",
        "code": "    for (int j = 0; j < 7; j++) {"
      },
      {
        "id": "blk-end",
        "code": "}"
      }
    ],
    "patternRows": [
      "* # @ * # @ *",
      "# @ * # @ * #",
      "@ * # @ * # @",
      "* # @ * # @ *"
    ],
    "expectedOutput": "* # @ * # @ *\n# @ * # @ * #\n@ * # @ * # @\n* # @ * # @ *"
  },
  "evaluation": {
    "strategy": "ordered-blocks",
    "expectedOrder": [
      "blk-decl",
      "blk-outer",
      "blk-inner",
      "blk-print",
      "blk-endl",
      "blk-end"
    ]
  },
  "hints": [
    "The array must exist before any loop reads from it, and each opening brace needs its matching close right after the body it wraps.",
    "Think about nesting: declaration, then the row loop, then the column loop inside it, then the print deepest of all."
  ],
  "explanation": {
    "concept": "modular indexing for cyclic patterns",
    "summary": "The correct order declares the array, opens the row loop, opens the column loop, prints symbols[(i + j) % 3], then closes the inner loop with a line break and closes the outer loop.",
    "details": "Because the index depends on i + j, every next row shifts the cycle by one: row 0 prints * # @ * # @ *, row 1 starts at index 1 with #, row 2 starts with @, and row 4 wraps back to *. The modulo keeps the index inside the 3-element array, producing diagonal stripes of each symbol."
  },
  "rewards": {
    "xp": 26
  },
  "version": 1
};
