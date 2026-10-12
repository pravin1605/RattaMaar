export default {
  "id": "pl-pyr-005",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "pyramids",
  "levelNumber": 5,
  "title": "Hollow Pyramid: Close the Right Edge",
  "difficulty": "intermediate",
  "estimatedMinutes": 4,
  "challengeType": "code-completion",
  "instructions": "Two edges and the base are starred; everything else is blank. Type the missing test that completes the condition.",
  "content": {
    "language": "java",
    "prompt": "The condition already covers the base row and the left edge. What test in ____ prints the star on the right edge of each row?",
    "code": "int n = 5;\nfor (int i = 1; i <= n; i++) {\n    for (int s = i; s < n; s++) System.out.print(\" \");\n    for (int j = 1; j <= 2 * i - 1; j++) {\n        if (i == n || j == 1 || ____) {\n            System.out.print(\"*\");\n        } else {\n            System.out.print(\" \");\n        }\n    }\n    System.out.println();\n}",
    "patternRows": [
      "    *",
      "   * *",
      "  *   *",
      " *     *",
      "*********"
    ],
    "patternVariables": [
      "i=1  width=1",
      "i=2  width=3",
      "i=3  width=5",
      "i=4  width=7",
      "i=5  width=9  (base filled)"
    ],
    "expectedOutput": "    *\n   * *\n  *   *\n *     *\n*********",
    "answerLabel": "Missing condition",
    "answerPlaceholder": "a boolean test using i and j"
  },
  "evaluation": {
    "strategy": "structured-answer",
    "acceptedAnswers": [
      "j == 2 * i - 1",
      "j==2*i-1",
      "j == 2*i - 1",
      "j == 2*i-1",
      "j == (2 * i) - 1",
      "2 * i - 1 == j",
      "j==2 * i-1"
    ]
  },
  "hints": [
    "The star on the right edge sits in the very last column the inner loop is allowed to visit.",
    "Reuse the loop bound itself as a test: when j has reached it, the column is the row's final one."
  ],
  "explanation": {
    "concept": "boundary tests inside a hollow figure",
    "summary": "The right edge is the column where j equals the loop bound 2 * i - 1, so testing that equality stars the last column of every row.",
    "details": "Every row has width 2 * i - 1, so its edges are j = 1 and j = 2 * i - 1; the third test supplies the second of those. The extra clause i == n short-circuits the whole condition on the base row, which is why the last line is solid. Interior columns fall through to the else branch and print spaces, and because the final column of each row is always a star, no trailing blank is produced.",
    "modelAnswer": "if (i == n || j == 1 || j == 2 * i - 1) {\n    System.out.print(\"*\");\n} else {\n    System.out.print(\" \");\n}"
  },
  "rewards": {
    "xp": 24
  },
  "prerequisites": [
    "pl-pyr-004"
  ],
  "version": 1
};
