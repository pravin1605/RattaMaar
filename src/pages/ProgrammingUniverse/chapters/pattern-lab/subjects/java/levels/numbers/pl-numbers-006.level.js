export default {
  "id": "pl-numbers-006",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "numbers",
  "levelNumber": 6,
  "title": "Row Number Repeated by Row Number",
  "difficulty": "intermediate",
  "estimatedMinutes": 2,
  "challengeType": "predict-output",
  "instructions": "Note which variable is printed and how many times per row, then type the exact output.",
  "content": {
    "language": "java",
    "prompt": "Type the output for the 4 rows:",
    "code": "for (int i = 1; i <= 4; i++) {\n    for (int j = 1; j <= i; j++) {\n        System.out.print(i);\n    }\n    System.out.println();\n}",
    "patternRows": [
      "1",
      "22",
      "333",
      "4444"
    ],
    "expectedOutput": "1\n22\n333\n4444"
  },
  "evaluation": {
    "strategy": "structured-answer",
    "acceptedAnswers": [
      "1\n22\n333\n4444"
    ]
  },
  "hints": [
    "The print statement uses the outer variable, so the value cannot change within one row.",
    "The inner loop bound equals the same outer variable, so repetition count and printed digit come from the same source."
  ],
  "explanation": {
    "concept": "printing i instead of j",
    "summary": "Row i prints the digit i exactly i times, because both the printed value and the loop bound come from the outer counter.",
    "details": "Swapping print(i) for print(j) would restart every row at 1; keeping print(i) makes each row a run of identical digits. print uses no separator, so row 3 reads 333 as one block of three characters."
  },
  "rewards": {
    "xp": 18
  },
  "version": 1
};
