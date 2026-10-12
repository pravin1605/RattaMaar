export default {
  "id": "cq-cb-007",
  "chapterId": "code-quest",
  "subjectId": "java-fundamentals",
  "modeId": "code-builder",
  "levelNumber": 7,
  "title": "Hand the Values Over Through a Temp",
  "difficulty": "intermediate",
  "estimatedMinutes": 3,
  "challengeType": "code-ordering",
  "instructions": "Arrange the statements so the two variables exchange their values without losing either one.",
  "content": {
    "language": "java",
    "codeBefore": "int a = 7;\nint b = 9;",
    "codeAfter": "// expected: a=9 b=7",
    "prompt": "End state: a holds 9 and b holds 7.",
    "blocks": [
      { "id": "s4", "code": "System.out.println(\"a=\" + a + \" b=\" + b);" },
      { "id": "s1", "code": "int temp = a;" },
      { "id": "s3", "code": "b = temp;" },
      { "id": "s2", "code": "a = b;" }
    ]
  },
  "evaluation": { "strategy": "ordered-blocks", "expectedOrder": ["s1", "s2", "s3", "s4"] },
  "hints": [
    "Any assignment overwrites its target, so whichever value is needed later must be parked somewhere first.",
    "The report on the final state can only be printed after both transfers are complete."
  ],
  "explanation": {
    "concept": "Swapping two variables with a temporary",
    "summary": "temp first rescues the value of a, then a can safely receive b's value, then b receives the rescued 7. Only afterwards does the print show the exchanged pair a=9 b=7.",
    "details": "Writing b = a before a = b would make both variables hold the same value and lose the original. The temporary slot is the classic three-step exchange used in sorting and reversal routines alike."
  },
  "rewards": { "xp": 23 },
  "version": 1
};
