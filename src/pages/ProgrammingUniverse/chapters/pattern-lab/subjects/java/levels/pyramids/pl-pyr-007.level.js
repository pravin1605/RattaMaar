export default {
  "id": "pl-pyr-007",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "pyramids",
  "levelNumber": 7,
  "title": "Hollow Diamond: Count the Stars, Not the Blanks",
  "difficulty": "advanced",
  "estimatedMinutes": 4,
  "challengeType": "numeric-answer",
  "instructions": "Only the two edges of each row are starred. Work out how many star characters the whole run writes and answer with that number.",
  "content": {
    "language": "java",
    "prompt": "How many '*' characters does this program print in total? Leading and interior spaces do not count.",
    "code": "int n = 4;\nfor (int r = 1; r <= 2 * n - 1; r++) {\n    int width = (r <= n) ? r : 2 * n - r;\n    for (int s = width; s < n; s++) System.out.print(\" \");\n    for (int j = 1; j <= 2 * width - 1; j++) {\n        if (j == 1 || j == 2 * width - 1) {\n            System.out.print(\"*\");\n        } else {\n            System.out.print(\" \");\n        }\n    }\n    System.out.println();\n}",
    "patternRows": [
      "   *",
      "  * *",
      " *   *",
      "*     *",
      " *   *",
      "  * *",
      "   *"
    ],
    "patternVariables": [
      "r=1  width=1  stars=1",
      "r=2  width=2  stars=2",
      "r=3  width=3  stars=2",
      "r=4  width=4  stars=2",
      "r=5  width=3  stars=2",
      "r=6  width=2  stars=2",
      "r=7  width=1  stars=1"
    ],
    "expectedOutput": "   *\n  * *\n *   *\n*     *\n *   *\n  * *\n   *",
    "answerLabel": "Number of stars",
    "answerPlaceholder": "type a whole number",
    "answerRows": 1
  },
  "evaluation": {
    "strategy": "numeric-tolerance",
    "expectedNumber": 12,
    "tolerance": 0
  },
  "hints": [
    "On a row of width one, the two edge tests describe the same column, so only one star is written there.",
    "Separate the rows into tips and sides before adding anything; the mirror guarantees the two halves behave alike."
  ],
  "explanation": {
    "concept": "edge tests collapsing on a single column",
    "summary": "The diamond has two tip rows that print one star each and five side rows that print two edge stars each.",
    "details": "The condition j == 1 || j == 2 * width - 1 stars the first and last column of the row. When width is 1 both tests point at column 1, and because a single if writes one star, the tips contribute exactly one character. Everything else falls into the else branch and writes a space, so interior blanks are never counted even though they widen the row. Counting rows rather than columns keeps the arithmetic short: 2 tips plus 5 side rows."
  },
  "rewards": {
    "xp": 30
  },
  "prerequisites": [
    "pl-pyr-006"
  ],
  "version": 1
};
