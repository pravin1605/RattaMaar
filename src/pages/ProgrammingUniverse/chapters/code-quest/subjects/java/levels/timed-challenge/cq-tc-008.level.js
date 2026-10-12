export default {
  "id": "cq-tc-008",
  "chapterId": "code-quest",
  "subjectId": "java-fundamentals",
  "modeId": "timed-challenge",
  "levelNumber": 8,
  "title": "Char Math Sprint",
  "difficulty": "intermediate",
  "estimatedMinutes": 1,
  "timeLimitSeconds": 25,
  "challengeType": "numeric-answer",
  "instructions": "Quickly compute the printed value.",
  "content": {
    "language": "java",
    "prompt": "What is printed?\nchar c = 'B';\nSystem.out.println(c + 1);",
    "answerLabel": "The printed number"
  },
  "evaluation": { "strategy": "numeric-tolerance", "expectedNumber": 67, "tolerance": 0 },
  "hints": [
    "char is promoted to int when used with +.",
    "'A' is 65 in Unicode/ASCII order."
  ],
  "explanation": {
    "concept": "char arithmetic promotion",
    "summary": "'B' has code value 66, so c + 1 is computed as int 67 and printed as a number, not a character.",
    "details": "The '+' operator promotes char to int; to print the next letter you must cast: System.out.println((char)(c + 1))."
  },
  "rewards": { "xp": 18 },
  "version": 1
};
