export default {
  "id": "java-bug-hunter-syntax-basics-002",
  "chapterId": "code-quest",
  "subjectId": "java-fundamentals",
  "modeId": "bug-hunter",
  "levelNumber": 2,
  "title": "Fix the Missing Semicolon",
  "difficulty": "beginner",
  "estimatedMinutes": 2,
  "challengeType": "find-and-fix",
  "instructions": "One Java statement is missing punctuation. Choose the correction that makes it valid.",
  "content": {
    "language": "java",
    "code": "int score = 10\nSystem.out.println(score);",
    "prompt": "What should be added after the first line?",
    "choices": [
      {
        "id": "semicolon",
        "label": "A semicolon (;) after 10."
      },
      {
        "id": "comma",
        "label": "A comma (,)."
      },
      {
        "id": "colon",
        "label": "A colon (:)."
      }
    ]
  },
  "evaluation": {
    "strategy": "validated-correction",
    "expectedFixId": "semicolon"
  },
  "hints": [
    "Java statements normally end with a semicolon.",
    "The first line is a variable declaration."
  ],
  "explanation": {
    "concept": "Java statement terminators",
    "summary": "The declaration int score = 10; is a complete Java statement. The semicolon tells Java where the statement ends.",
    "details": "The next println statement is separate and also ends with a semicolon."
  },
  "rewards": {
    "xp": 12
  },
  "version": 1
};
