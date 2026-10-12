export default {
  "id": "cq-bh-006",
  "chapterId": "code-quest",
  "subjectId": "java-fundamentals",
  "modeId": "bug-hunter",
  "levelNumber": 6,
  "title": "Same Words, Different Verdict",
  "difficulty": "beginner",
  "estimatedMinutes": 3,
  "challengeType": "find-and-fix",
  "instructions": "The developer expected same but the program prints different. Choose the correction that compares the text content.",
  "content": {
    "language": "java",
    "code": "String a = new String(\"java\");\nString b = new String(\"java\");\nif (a == b) {\n    System.out.println(\"same\");\n} else {\n    System.out.println(\"different\");\n}",
    "prompt": "Which fix makes the program print same?",
    "choices": [
      { "id": "equals", "label": "Replace a == b with a.equals(b)." },
      { "id": "hash", "label": "Replace a == b with a == b.toString()." },
      { "id": "assign", "label": "Replace a == b with a = b." },
      { "id": "length", "label": "Replace a == b with a.length() == b.length()." }
    ]
  },
  "evaluation": { "strategy": "validated-correction", "expectedFixId": "equals" },
  "hints": [
    "Two separately constructed objects can hold identical characters while being distinct objects.",
    "Reference comparison answers \"is it the same object?\"; you need the method that answers \"does it hold the same characters?\"."
  ],
  "explanation": {
    "concept": "Reference equality (==) versus content equality (equals)",
    "summary": "new String(...) creates two distinct objects, so == compares references and finds them different. a.equals(b) compares the character sequences and returns true, printing same.",
    "details": "a == b.toString() is still a reference comparison, so it changes nothing; comparing only the number of characters would wrongly accept texts like go and do. Only equals checks the actual content."
  },
  "rewards": { "xp": 18 },
  "version": 1
};
