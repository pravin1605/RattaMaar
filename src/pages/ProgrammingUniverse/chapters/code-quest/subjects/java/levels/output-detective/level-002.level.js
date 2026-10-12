export default {
  "id": "java-output-detective-syntax-basics-002",
  "chapterId": "code-quest",
  "subjectId": "java-fundamentals",
  "modeId": "output-detective",
  "levelNumber": 2,
  "title": "Print or Println?",
  "difficulty": "beginner",
  "estimatedMinutes": 2,
  "challengeType": "predict-output",
  "instructions": "Predict the exact order of output from these two statements.",
  "content": {
    "language": "java",
    "code": "System.out.print(\"A\");\nSystem.out.println(\"B\");",
    "prompt": "What appears on the screen?",
    "choices": [
      {
        "id": "ab",
        "label": "AB on one line, then a new line."
      },
      {
        "id": "a-b",
        "label": "A and B on separate lines."
      },
      {
        "id": "ba",
        "label": "BA on one line."
      }
    ]
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "ab"
  },
  "hints": [
    "print does not move to a new line.",
    "println prints its text and then moves to the next line."
  ],
  "explanation": {
    "concept": "print() versus println()",
    "summary": "The output is AB on one line. The first print keeps the cursor on that line, then println prints B and moves the cursor.",
    "details": "A new line after println does not split A and B because the cursor was still on the same line before B."
  },
  "rewards": {
    "xp": 12
  },
  "version": 1
};
