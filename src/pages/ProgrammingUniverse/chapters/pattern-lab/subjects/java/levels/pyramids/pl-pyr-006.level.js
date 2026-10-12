export default {
  "id": "pl-pyr-006",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "pyramids",
  "levelNumber": 6,
  "title": "Full Diamond of Stars: Order a Mirrored Row Loop",
  "difficulty": "advanced",
  "estimatedMinutes": 6,
  "challengeType": "code-ordering",
  "instructions": "Arrange the blocks so one outer loop draws the climb and the mirror of a diamond, matching the output shown.",
  "content": {
    "language": "java",
    "prompt": "Put these seven blocks in the order that prints the diamond below.",
    "blocks": [
      {
        "id": "c4",
        "code": "    for (int s = width; s < n; s++) System.out.print(\" \");"
      },
      {
        "id": "c7",
        "code": "}"
      },
      {
        "id": "c2",
        "code": "for (int r = 1; r <= 2 * n - 1; r++) {"
      },
      {
        "id": "c6",
        "code": "    System.out.println();"
      },
      {
        "id": "c1",
        "code": "int n = 4;"
      },
      {
        "id": "c5",
        "code": "    for (int j = 1; j <= 2 * width - 1; j++) System.out.print(\"*\");"
      },
      {
        "id": "c3",
        "code": "    int width = (r <= n) ? r : 2 * n - r;"
      }
    ],
    "patternRows": [
      "   *",
      "  ***",
      " *****",
      "*******",
      " *****",
      "  ***",
      "   *"
    ],
    "patternVariables": [
      "r=1  width=1",
      "r=2  width=2",
      "r=3  width=3",
      "r=4  width=4  (middle)",
      "r=5  width=3",
      "r=6  width=2",
      "r=7  width=1"
    ],
    "expectedOutput": "   *\n  ***\n *****\n*******\n *****\n  ***\n   *"
  },
  "evaluation": {
    "strategy": "ordered-blocks",
    "expectedOrder": [
      "c1",
      "c2",
      "c3",
      "c4",
      "c5",
      "c6",
      "c7"
    ]
  },
  "hints": [
    "The height has to exist before the header can count rows up to twice it, and the row number must be turned into a width before any loop reads that width.",
    "Within a row, indentation is written before the stars, and the line break belongs after both inner loops and before the closing brace."
  ],
  "explanation": {
    "concept": "folding a second pyramid onto the first",
    "summary": "One loop over 2n - 1 rows converts the row number into a mirrored width, so the climb and the fall share the same body.",
    "details": "While r is at most n the width equals r; after the middle row the expression 2 * n - r replays the earlier widths in reverse, so r = 5 yields 3 and r = 7 yields 1. Both inner loops then use that width: n - width spaces followed by 2 * width - 1 stars, giving the odd widths 1, 3, 5, 7, 5, 3, 1. Keeping the line break inside the outer loop is what separates the seven rows instead of one long line."
  },
  "rewards": {
    "xp": 28
  },
  "prerequisites": [
    "pl-pyr-005"
  ],
  "version": 1
};
