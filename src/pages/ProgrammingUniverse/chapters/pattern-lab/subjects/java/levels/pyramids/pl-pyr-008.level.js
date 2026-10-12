export default {
  "id": "pl-pyr-008",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "pyramids",
  "levelNumber": 8,
  "title": "Half-Diamond That Prints Its Tip Twice",
  "difficulty": "advanced",
  "estimatedMinutes": 5,
  "challengeType": "find-and-fix",
  "instructions": "The goal is a left-aligned half-diamond with one short tip row. Compare the output with the goal and choose the smallest correct fix.",
  "content": {
    "language": "java",
    "prompt": "Output shown has a duplicated row. Which change removes the duplicate without losing any other row?",
    "code": "// Goal: ****  ***  **  *  **  ***  ****  (seven rows, tip printed once)\nint n = 4;\nfor (int i = n; i >= 1; i--) {\n    for (int j = 1; j <= i; j++) System.out.print(\"*\");\n    System.out.println();\n}\nfor (int i = 1; i <= n; i++) {\n    for (int j = 1; j <= i; j++) System.out.print(\"*\");\n    System.out.println();\n}",
    "patternRows": [
      "****",
      "***",
      "**",
      "*",
      "*",
      "**",
      "***",
      "****"
    ],
    "patternVariables": [
      "i=4 from loop 1",
      "i=3 from loop 1",
      "i=2 from loop 1",
      "i=1 from loop 1",
      "i=1 from loop 2",
      "i=2 from loop 2",
      "i=3 from loop 2",
      "i=4 from loop 2"
    ],
    "expectedOutput": "****\n***\n**\n*\n*\n**\n***\n****",
    "choices": [
      {
        "id": "fix-lower-start",
        "label": "Let the second loop start its counter at 2, because the first loop already produced the row for 1"
      },
      {
        "id": "fix-first-end",
        "label": "Make the first loop stop one row early so it never prints the shortest row at all"
      },
      {
        "id": "fix-inner-bound",
        "label": "Tighten the inner loop test to j < i so every row loses one star"
      },
      {
        "id": "fix-print-move",
        "label": "Move the line break out of the second loop so its rows join onto one line"
      }
    ]
  },
  "evaluation": {
    "strategy": "validated-correction",
    "expectedFixId": "fix-lower-start"
  },
  "hints": [
    "The duplicated row comes from the last trip of one loop and the first trip of the other, where both use the same width.",
    "The widest row must stay in both halves, so the fix belongs at one loop edge rather than in the inner loop."
  ],
  "explanation": {
    "concept": "overlapping loop ranges",
    "summary": "Both loops include the width of 1, so the tip row prints twice; skipping that width in the second loop gives seven rows.",
    "details": "The first loop covers i = 4 down to 1 and the second covers 1 up to 4, so their ranges overlap at exactly one value. Starting the second loop at 2 keeps the mirror symmetric and leaves the shared widest row printed once by each loop, which is intended. Ending the first loop early instead would drop a row from the shrinking half, and changing the inner bound would corrupt every width, not just the duplicate.",
    "modelAnswer": "int n = 4;\nfor (int i = n; i >= 1; i--) {\n    for (int j = 1; j <= i; j++) System.out.print(\"*\");\n    System.out.println();\n}\nfor (int i = 2; i <= n; i++) {\n    for (int j = 1; j <= i; j++) System.out.print(\"*\");\n    System.out.println();\n}"
  },
  "rewards": {
    "xp": 32
  },
  "prerequisites": [
    "pl-pyr-007"
  ],
  "version": 1
};
