export default {
  "id": "pl-adv-009",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "advanced",
  "levelNumber": 9,
  "title": "Number Butterfly: Find the Missing Wing",
  "difficulty": "advanced",
  "estimatedMinutes": 5,
  "challengeType": "pattern-prediction",
  "instructions": "Each row prints an ascending left wing, a shrinking gap, and a right wing that ends at n. Choose the third row.",
  "content": {
    "language": "java",
    "prompt": "The first two rows and the last row are printed below. Which line is the third row of this 4-row number butterfly?",
    "code": "int n = 4;\nfor (int i = 1; i <= n; i++) {\n    for (int j = 1; j <= i; j++) System.out.print(j);\n    for (int s = 1; s <= 2 * (n - i); s++) System.out.print(\" \");\n    for (int j = n - i + 1; j <= n; j++) System.out.print(j);\n    System.out.println();\n}",
    "patternRows": [
      "1      4",
      "12    34",
      "123  234",
      "12341234"
    ],
    "choices": [
      { "id": "bf-third-row", "label": "123  234" },
      { "id": "bf-mirror", "label": "123  321" },
      { "id": "bf-wrong-gap", "label": "123 234" },
      { "id": "bf-full-left", "label": "1234  234" }
    ]
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "bf-third-row"
  },
  "hints": [
    "Every row is exactly 2*n characters wide, so the left digits, the blank gap and the right digits must total 8.",
    "The left wing counts up from 1 to the row number while the right wing always finishes at n; track how the gap shrinks by two blanks each row."
  ],
  "explanation": {
    "concept": "butterfly pattern: wings plus shrinking centre gap",
    "summary": "Row 3 prints 123, then 2*(4-3) = 2 blanks, then the run 2 3 4, giving exactly 123__234 with two spaces.",
    "details": "The three inner loops are left wing (j = 1..i), gap (2*(n-i) blanks) and right wing (j = n-i+1..n). Width check: i + 2*(n-i) + i = 2n for every row, so no row can be longer or shorter — the single-gap distractor breaks this invariant. The right wing starts at n-i+1 precisely so it always ends at n with i digits; mirroring it as 321 would need a descending loop, which the code does not contain."
  },
  "rewards": { "xp": 30 },
  "version": 1
};
