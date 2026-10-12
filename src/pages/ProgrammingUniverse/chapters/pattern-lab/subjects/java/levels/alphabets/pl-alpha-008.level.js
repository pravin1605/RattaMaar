export default {
  "id": "pl-alpha-008",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "alphabets",
  "levelNumber": 8,
  "title": "Diamond of Letters From A to C",
  "difficulty": "intermediate",
  "estimatedMinutes": 4,
  "challengeType": "predict-output",
  "instructions": "Two loops share the same row body here. Decide what the complete output looks like before answering.",
  "content": {
    "language": "java",
    "prompt": "The first loop climbs to row n, the second loop starts at n - 1 and counts down. What is printed?",
    "code": "int n = 3;\nfor (int i = 1; i <= n; i++) {\n    for (int s = i; s < n; s++) System.out.print(\" \");\n    for (int j = 0; j < i; j++) System.out.print((char) ('A' + j));\n    for (int j = i - 2; j >= 0; j--) System.out.print((char) ('A' + j));\n    System.out.println();\n}\nfor (int i = n - 1; i >= 1; i--) {\n    for (int s = i; s < n; s++) System.out.print(\" \");\n    for (int j = 0; j < i; j++) System.out.print((char) ('A' + j));\n    for (int j = i - 2; j >= 0; j--) System.out.print((char) ('A' + j));\n    System.out.println();\n}",
    "patternRows": [
      "  A",
      " ABA",
      "ABCBA",
      " ABA",
      "  A"
    ],
    "patternVariables": [
      "i=1  padding=2",
      "i=2  padding=1",
      "i=3  padding=0  (widest)",
      "i=2  padding=1",
      "i=1  padding=2"
    ],
    "expectedOutput": "  A\n ABA\nABCBA\n ABA\n  A",
    "choices": [
      {
        "id": "diamond",
        "label": "Five rows: the climb up to ABCBA, then the same rows mirrored back down to A"
      },
      {
        "id": "triangle-only",
        "label": "Three rows only, because the second loop repeats work already done"
      },
      {
        "id": "widest-first",
        "label": "Five rows that start with ABCBA and then get narrower, never getting wider"
      },
      {
        "id": "unpadded",
        "label": "Five rows all flush at the left margin, since padding only happens in the first loop"
      }
    ]
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "diamond"
  },
  "hints": [
    "The second loop begins one row below the widest row, so the peak letter appears in exactly one row of the whole figure.",
    "The body is identical in both loops, which means the padding rule still uses the current value of i."
  ],
  "explanation": {
    "concept": "mirroring a loop to close a diamond",
    "summary": "The upper loop prints rows 1..n and the lower loop prints rows n-1..1 with the same body, so the middle row appears once.",
    "details": "For a given i the body prints n - i spaces, then letters A..(A + i - 1), then back down to A, giving widths 1, 3, 5, 3, 1 - the odd widths of a diamond. Starting the mirror at n - 1 instead of n is what prevents a duplicated middle row. Both loops keep the padding loop, so the lower rows stay indented and the figure reads as a diamond rather than a left-aligned stack."
  },
  "rewards": {
    "xp": 28
  },
  "prerequisites": [
    "pl-alpha-007"
  ],
  "version": 1
};
