export default {
  "id": "cq-od-007",
  "chapterId": "code-quest",
  "subjectId": "java-fundamentals",
  "modeId": "output-detective",
  "levelNumber": 7,
  "title": "Before or After, Four Prints",
  "difficulty": "intermediate",
  "estimatedMinutes": 4,
  "challengeType": "predict-output",
  "instructions": "Track how x changes across the postfix and prefix operators, then pick the output.",
  "content": {
    "language": "java",
    "code": "int x = 5;\nSystem.out.println(x++);\nSystem.out.println(++x);\nSystem.out.println(--x);\nSystem.out.println(x);",
    "prompt": "What is printed?",
    "choices": [
      { "id": "a", "label": "5 then 7 then 6 then 6" },
      { "id": "b", "label": "6 then 7 then 6 then 7" },
      { "id": "c", "label": "5 then 6 then 5 then 6" },
      { "id": "d", "label": "6 then 6 then 5 then 5" }
    ]
  },
  "evaluation": { "strategy": "single-choice", "correctChoiceId": "a" },
  "hints": [
    "Postfix hands the old value to the print first, then updates the variable.",
    "Prefix updates the variable first, and the print sees the new value; the final line just reads whatever is stored."
  ],
  "explanation": {
    "concept": "Prefix versus postfix increment and decrement",
    "summary": "x++ prints 5 and leaves x at 6. ++x then bumps x to 7 before printing, so the second line shows 7. --x brings it back to 6 and prints that. The last println reads the stored value, still 6.",
    "details": "The position of the operator relative to the variable decides whether the expression value is the old or the new one. The side effect (the update) always happens before the next statement runs."
  },
  "rewards": { "xp": 22 },
  "version": 1
};
