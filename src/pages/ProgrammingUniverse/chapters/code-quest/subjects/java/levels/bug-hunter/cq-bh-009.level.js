export default {
  "id": "cq-bh-009",
  "chapterId": "code-quest",
  "subjectId": "java-fundamentals",
  "modeId": "bug-hunter",
  "levelNumber": 9,
  "title": "Predict the Output Once the Step Is Reversed",
  "difficulty": "intermediate",
  "estimatedMinutes": 4,
  "challengeType": "debug-output",
  "instructions": "The update expression drives the counter the wrong way, so the test never fails. Once it is corrected so the counter grows, what does the fixed loop print?",
  "content": {
    "language": "java",
    "code": "for (int i = 0; i < 5; i--) {\n    System.out.println(i);\n}",
    "prompt": "Output after the update expression is fixed?",
    "choices": [
      { "id": "a", "label": "0, 1, 2, 3, 4 on five separate lines" },
      { "id": "b", "label": "5, 4, 3, 2, 1 on five separate lines" },
      { "id": "c", "label": "Still nothing: the test never becomes false" },
      { "id": "d", "label": "0 through 4 repeated forever" }
    ]
  },
  "evaluation": { "strategy": "single-choice", "correctChoiceId": "a" },
  "hints": [
    "The fix changes the direction of the update, not the starting point or the limit.",
    "Count the passes: the body runs while the counter stays below the limit, and stops the moment it reaches it."
  ],
  "explanation": {
    "concept": "Infinite loop from a wrong update expression",
    "summary": "With i-- the counter moves away from the limit 5 (0, -1, -2, ...) so i < 5 never fails — the original loop never terminates. Correcting it to i++ makes five passes with i = 0, 1, 2, 3, 4, each printed on its own line.",
    "details": "A for loop checks the condition before every body execution. The buggy version prints lines forever; the fixed version stops when i reaches 5 because the test i < 5 then fails."
  },
  "rewards": { "xp": 25 },
  "version": 1
};
