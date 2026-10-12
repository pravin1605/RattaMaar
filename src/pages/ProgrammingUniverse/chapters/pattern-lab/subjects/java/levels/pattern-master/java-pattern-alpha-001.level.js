export default {
  "id": "java-pattern-alpha-001",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "levelNumber": 1,
  "title": "Alphabet Steps",
  "difficulty": "beginner",
  "estimatedMinutes": 2,
  "challengeType": "predict-output",
  "instructions": "Study the example, reason through the loop logic, then choose the correct answer.",
  "content": {
    "language": "java",
    "prompt": "If the first row prints A, the second prints A B, and the third prints A B C, what is row three?",
    "choices": [
      {
        "id": "abc",
        "label": "A B C"
      },
      {
        "id": "cba",
        "label": "C B A"
      },
      {
        "id": "ccc",
        "label": "C C C"
      }
    ],
    "code": "for (char ch = 'A'; ch <= 'C'; ch++) {\n    // each row prints letters from A through its row letter\n}",
    "patternRows": [
      "A",
      "A B",
      "A B C"
    ],
    "expectedOutput": "A\nA B\nA B C"
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "abc"
  },
  "hints": [
    "Trace the outer loop first, then count what the inner loop prints.",
    "Use the row number and the loop condition to check the number of iterations."
  ],
  "explanation": {
    "concept": "character sequence",
    "summary": "The pattern starts from A on each row and continues until the character matching that row.",
    "details": "Character loops can move from A to B to C because characters have ordered character codes."
  },
  "rewards": {
    "xp": 15
  },
  "version": 1,
  "categoryId": "alphabets"
};
