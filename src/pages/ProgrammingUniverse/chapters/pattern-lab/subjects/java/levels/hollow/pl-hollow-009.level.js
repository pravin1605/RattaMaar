export default {
  "id": "pl-hollow-009",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "hollow",
  "levelNumber": 9,
  "title": "Mirror the Numbers: 1 2 3 2 1",
  "difficulty": "intermediate",
  "estimatedMinutes": 3,
  "challengeType": "predict-output",
  "instructions": "Each row counts up to its row number and back down. Type the third printed row exactly, with single spaces between the numbers.",
  "content": {
    "language": "java",
    "prompt": "Type line 3 of the output for n = 4.",
    "code": "int n = 4;\nfor (int i = 1; i <= n; i++) {\n    for (int j = 1; j <= i; j++) System.out.print(j + \" \");\n    for (int j = i - 1; j >= 1; j--) System.out.print(j + \" \");\n    System.out.println();\n}",
    "patternRows": [
      "1",
      "1 2 1",
      "1 2 3 2 1",
      "1 2 3 4 3 2 1"
    ],
    "expectedOutput": "1\n1 2 1\n1 2 3 2 1\n1 2 3 4 3 2 1"
  },
  "evaluation": {
    "strategy": "structured-answer",
    "acceptedAnswers": ["1 2 3 2 1"]
  },
  "hints": [
    "The ascending loop prints 1 through the row number; the descending loop starts one step below its peak.",
    "The center of every row is the row number itself, and the sequence reads the same forwards and backwards."
  ],
  "explanation": {
    "concept": "asymmetric loop bounds producing a palindrome",
    "summary": "On row 3 the first loop prints 1 2 3 and the second loop starts at i - 1 = 2, so 2 1 closes the line, giving a symmetric sequence.",
    "details": "Starting the descending loop at i - 1 instead of i avoids printing the peak number twice. Both loops use the token form j + \" \", so adjacent numbers are separated by exactly one space, and the visualizer drops the harmless trailing space at the line end."
  },
  "rewards": { "xp": 25 },
  "prerequisites": ["pl-hollow-008"],
  "version": 1
};
