export default {
  "id": "pl-alpha-003",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "alphabets",
  "levelNumber": 3,
  "title": "Reversed Alphabet Triangle (CBA First)",
  "difficulty": "beginner",
  "estimatedMinutes": 3,
  "challengeType": "pattern-prediction",
  "instructions": "Both loops count downwards here. Type the complete printed output exactly as Java produces it.",
  "content": {
    "language": "java",
    "prompt": "Type every printed row, one row per line, with no spaces inside a row.",
    "code": "int n = 3;\nfor (int i = n; i >= 1; i--) {\n    for (int j = i; j >= 1; j--) {\n        System.out.print((char) ('A' + j - 1));\n    }\n    System.out.println();\n}",
    "patternVariables": [
      "i=3  j=3,2,1",
      "i=2  j=2,1",
      "i=1  j=1"
    ],
    "expectedOutput": "CBA\nBA\nA",
    "answerLabel": "Full output",
    "answerPlaceholder": "three rows, one per line",
    "answerRows": 3
  },
  "evaluation": {
    "strategy": "exact-output",
    "expectedOutput": "CBA\nBA\nA"
  },
  "hints": [
    "The outer loop feeds rows to the printer in reverse order, so the widest row is produced first.",
    "Inside one row, j walks down to 1, and j = 1 is the offset that gives the alphabet's first letter."
  ],
  "explanation": {
    "concept": "descending nested loops",
    "summary": "Row i prints j = i down to j = 1, so letters run from that row's own letter backwards to A while the rows shrink.",
    "details": "'A' + j - 1 maps j = 1 to A, j = 2 to B and j = 3 to C. The first outer iteration has i = 3, so it emits C, B, A on one line because print never breaks the line. Since the outer loop decrements from n, the row lengths go 3, 2, 1 - a triangle that points down instead of up."
  },
  "rewards": {
    "xp": 18
  },
  "prerequisites": [
    "pl-alpha-002"
  ],
  "version": 1
};
