export default {
  "id": "cq-cb-005",
  "chapterId": "code-quest",
  "subjectId": "java-fundamentals",
  "modeId": "code-builder",
  "levelNumber": 5,
  "title": "Supply the Missing Step Size",
  "difficulty": "intermediate",
  "estimatedMinutes": 3,
  "challengeType": "fill-in-blank",
  "instructions": "Type the for-loop update expression (without the semicolon) that makes the printed series come out as shown.",
  "content": {
    "language": "java",
    "codeBefore": "for (int i = 0; i < 9; ____) {",
    "codeAfter": "    System.out.print(i + \" \");\n}",
    "prompt": "Required output: 0 2 4 6 8",
    "answerLabel": "Update expression",
    "answerPlaceholder": "e.g. an assignment-style step"
  },
  "evaluation": { "strategy": "structured-answer", "acceptedAnswers": ["i+=2", "i += 2", "i=i+2", "i = i + 2", "i+= 2", "i +=2"] },
  "hints": [
    "The series visits every other number, so one step must cover a distance of two.",
    "The starting point and the stop test are already correct; only the amount added per pass is missing."
  ],
  "explanation": {
    "concept": "Choosing the update expression of a for loop",
    "summary": "Printing 0 2 4 6 8 requires i to grow by two on every pass, so the update is i += 2 (equivalently i = i + 2). With the existing test i < 9 the loop runs for i = 0, 2, 4, 6, 8 and then stops.",
    "details": "A plain increment would print every number up to 8; a two-step jump starts one position ahead (2 4 6 8) and skips the zero. The compound assignment operator keeps the loop header compact."
  },
  "rewards": { "xp": 20 },
  "version": 1
};
