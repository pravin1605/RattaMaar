export default {
  "id": "pl-adv-008",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "advanced",
  "levelNumber": 8,
  "title": "X-Shaped Binary Grid: Repair the Mirror Diagonal",
  "difficulty": "advanced",
  "estimatedMinutes": 5,
  "challengeType": "find-and-fix",
  "instructions": "The target grid below should print 1 on both diagonals and 0 elsewhere. One condition is wrong. Choose the fix.",
  "content": {
    "language": "java",
    "prompt": "The main diagonal uses j == i, but the drawn anti-diagonal is slanted the wrong way: it prints 1 at column 0-based offsets instead of mirroring. Which correction produces the shown 5x5 X grid?",
    "code": "for (int i = 1; i <= 5; i++) {\n    for (int j = 1; j <= 5; j++) {\n        if (j == i || j == 5 - i) {\n            System.out.print(\"1\");\n        } else {\n            System.out.print(\"0\");\n        }\n    }\n    System.out.println();\n}",
    "patternRows": [
      "10001",
      "01010",
      "00100",
      "01010",
      "10001"
    ],
    "choices": [
      { "id": "fix-six-minus", "label": "Replace j == 5 - i with j == 6 - i so the anti-diagonal mirrors column positions 1..5." },
      { "id": "fix-plus", "label": "Replace j == 5 - i with j == 5 + i to shift the second diagonal." },
      { "id": "fix-two-loops", "label": "Print the second diagonal with a separate loop after the first one." },
      { "id": "fix-zero-default", "label": "Change the else branch to print nothing instead of 0." }
    ]
  },
  "evaluation": {
    "strategy": "validated-correction",
    "expectedFixId": "fix-six-minus"
  },
  "hints": [
    "On a grid of size s the mirror diagonal pairs each row i with the column whose indices add up to s + 1; here the indices run 1 through 5.",
    "Test the candidate on the first row: the target prints 1 at columns 1 and 5, so the mirror condition must yield 5 when i is 1."
  ],
  "explanation": {
    "concept": "anti-diagonal index formula for X patterns",
    "summary": "With j == 5 - i the anti-diagonal is printed one column too far left on every row; j == 6 - i, i.e. size + 1 - i, hits columns 5, 4, 3, 2, 1 and draws the correct X.",
    "details": "In 1-based indexing the anti-diagonal of an s x s grid is the set of cells whose indices sum to s + 1. The buggy code prints 10010, 01100, 01100, 10010, 00001: on row 1 the mirror lands at column 4 instead of 5, and on row 5 it asks for column 0, which never exists, so the bottom-left corner 1 disappears. Verify any diagonal condition by checking the four corners: (1,1), (1,5), (5,1), (5,5) must behave correctly and (3,3) must light up for both diagonals."
  },
  "rewards": { "xp": 28 },
  "version": 1
};
