export default {
  "id": "pl-pyr-003",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "pyramids",
  "levelNumber": 3,
  "title": "Number Pyramid: Climb Up Then Back Down",
  "difficulty": "intermediate",
  "estimatedMinutes": 3,
  "challengeType": "predict-output",
  "instructions": "The sample stops at row 4. Extend the same loop logic by hand and type the row a sixth iteration would print.",
  "content": {
    "language": "java",
    "prompt": "Run the same loops with n = 6 and type the sixth row exactly, digits touching with no spaces.",
    "code": "int n = 4;\nfor (int i = 1; i <= n; i++) {\n    for (int j = 1; j <= i; j++) System.out.print(j);\n    for (int j = i - 1; j >= 1; j--) System.out.print(j);\n    System.out.println();\n}",
    "patternRows": [
      "1",
      "121",
      "12321",
      "1234321"
    ],
    "patternVariables": [
      "i=1  up=1  down=0 digits",
      "i=2  up=2  down=1 digit",
      "i=3  up=3  down=2 digits",
      "i=4  up=4  down=3 digits"
    ],
    "expectedOutput": "1\n121\n12321\n1234321",
    "answerLabel": "Row for i = 6",
    "answerPlaceholder": "digits only, no spaces",
    "answerRows": 1
  },
  "evaluation": {
    "strategy": "structured-answer",
    "acceptedAnswers": [
      "12345654321"
    ]
  },
  "hints": [
    "The second loop begins one step below the row number, which is why the peak digit only appears once.",
    "Row i carries i climbing digits followed by i - 1 falling digits, so the width is always an odd number."
  ],
  "explanation": {
    "concept": "palindromic digit runs from two loops",
    "summary": "Digits climb 1 to i then fall from i - 1 back to 1, so row six reads 12345654321.",
    "details": "The climb loop prints j for j = 1 .. i and the fall loop prints j for j = i - 1 .. 1. Because print takes the loop variable directly, the digits match the counter, and the peak digit is not duplicated. This is the numeric twin of the centred star pyramid: both grow by two characters per row, giving 2i - 1 characters in row i."
  },
  "rewards": {
    "xp": 20
  },
  "prerequisites": [
    "pl-pyr-002"
  ],
  "version": 1
};
