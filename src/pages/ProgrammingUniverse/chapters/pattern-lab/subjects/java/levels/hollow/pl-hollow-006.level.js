export default {
  "id": "pl-hollow-006",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "hollow",
  "levelNumber": 6,
  "title": "Sand Through the Hourglass",
  "difficulty": "intermediate",
  "estimatedMinutes": 4,
  "challengeType": "predict-output",
  "instructions": "Two loops share the same body: an upper half that shrinks and a lower half that grows. Choose the correct description of the middle line.",
  "content": {
    "language": "java",
    "prompt": "For n = 4 the program prints 7 lines. What does line 4 (the waist of the hourglass) contain?",
    "code": "int n = 4;\nfor (int i = 1; i <= n; i++) {\n    for (int s = 1; s < i; s++) System.out.print(\" \");\n    for (int j = 1; j <= 2 * (n - i) + 1; j++) System.out.print(\"*\");\n    System.out.println();\n}\nfor (int i = n - 1; i >= 1; i--) {\n    for (int s = 1; s < i; s++) System.out.print(\" \");\n    for (int j = 1; j <= 2 * (n - i) + 1; j++) System.out.print(\"*\");\n    System.out.println();\n}",
    "choices": [
      { "id": "waist", "label": "A single star preceded by three leading spaces" },
      { "id": "wide", "label": "A full row of seven stars with no leading spaces" },
      { "id": "mid", "label": "Three stars preceded by two leading spaces" }
    ],
    "patternRows": [
      "*******",
      " *****",
      "  ***",
      "   *",
      "  ***",
      " *****",
      "*******"
    ],
    "expectedOutput": "*******\n *****\n  ***\n   *\n  ***\n *****\n*******"
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "waist"
  },
  "hints": [
    "Line 4 is the last pass of the first loop, so substitute that row index into 2 * (n - i) + 1 and into the space loop bound.",
    "The second loop re-runs the row indices in reverse, so the waist appears exactly once, in the middle of the output."
  ],
  "explanation": {
    "concept": "mirrored loops and a shared formula",
    "summary": "At the last upper-half pass the star formula 2 * (n - i) + 1 collapses to one star while the space loop prints i - 1 leading spaces.",
    "details": "With n = 4 and i = 4, stars = 2 * 0 + 1 = 1 and spaces = 3. The decreasing loop then replays i = 3, 2, 1 so the widening lower half mirrors the narrowing upper half, giving 3 + 1 + 3 = 7 lines in total."
  },
  "rewards": { "xp": 20 },
  "prerequisites": ["pl-hollow-005"],
  "version": 1
};
