export default {
  "id": "cq-tc-010",
  "chapterId": "code-quest",
  "subjectId": "java-fundamentals",
  "modeId": "timed-challenge",
  "levelNumber": 10,
  "title": "Wrapper Snap Check",
  "difficulty": "advanced",
  "estimatedMinutes": 1,
  "timeLimitSeconds": 25,
  "challengeType": "multiple-choice",
  "instructions": "Decide the printed result immediately.",
  "content": {
    "language": "java",
    "prompt": "What does this print?\nInteger a = 127, b = 127;\nInteger c = 128, d = 128;\nSystem.out.println((a == b) + \" \" + (c == d));",
    "choices": [
      { "id": "a", "label": "true true" },
      { "id": "b", "label": "true false" },
      { "id": "c", "label": "false false" },
      { "id": "d", "label": "false true" }
    ]
  },
  "evaluation": { "strategy": "single-choice", "correctChoiceId": "b" },
  "hints": [
    "Integer.valueOf caches a specific range of values.",
    "127 is the upper edge of the cached -128..127 window."
  ],
  "explanation": {
    "concept": "Integer cache and == on wrappers",
    "summary": "a == b is true because both autobox to the SAME cached object (-128 to 127); 128 is outside the cache so c and d are distinct objects and == is false.",
    "details": "This is the classic demonstration that == on wrapper types is reference comparison with a cache-dependent twist. Always use equals() for wrapper values."
  },
  "rewards": { "xp": 22 },
  "version": 1
};
