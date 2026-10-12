export default {
  "id": "pl-stars-007",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "stars",
  "levelNumber": 7,
  "title": "Rhombus: Slanted Star Parallelogram",
  "difficulty": "intermediate",
  "estimatedMinutes": 3,
  "challengeType": "predict-output",
  "instructions": "One loop prints shrinking leading spaces, the other a fixed line of stars. Type the exact output.",
  "content": {
    "language": "java",
    "prompt": "Type the output row by row for n = 4:",
    "code": "int n = 4;\nfor (int i = 1; i <= n; i++) {\n    for (int s = 1; s <= n - i; s++) {\n        System.out.print(\" \");\n    }\n    for (int j = 1; j <= n; j++) {\n        System.out.print(\"* \");\n    }\n    System.out.println();\n}",
    "patternRows": [
      "   * * * *",
      "  * * * *",
      " * * * *",
      "* * * *"
    ],
    "expectedOutput": "   * * * *\n  * * * *\n * * * *\n* * * *"
  },
  "evaluation": {
    "strategy": "structured-answer",
    "acceptedAnswers": [
      "   * * * *\n  * * * *\n * * * *\n* * * *"
    ]
  },
  "hints": [
    "Every row prints the same four stars; only the indentation changes from row to row.",
    "The indent shrinks by one space each new row, so the whole line slides left as you go down."
  ],
  "explanation": {
    "concept": "rhombus as a sheared rectangle",
    "summary": "Each row prints n-i leading spaces followed by n stars, so identical star lines shifted one column left per row form a parallelogram leaning right.",
    "details": "The star loop bound is constant (j <= n), so width never changes; only the space loop bound n - i changes. Row 1 is indented 3 spaces, the last row none. The visible edges are slanted because the left ends step leftward."
  },
  "rewards": {
    "xp": 22
  },
  "version": 1
};
