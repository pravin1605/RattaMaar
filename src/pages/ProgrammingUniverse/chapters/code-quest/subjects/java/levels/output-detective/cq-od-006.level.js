export default {
  "id": "cq-od-006",
  "chapterId": "code-quest",
  "subjectId": "java-fundamentals",
  "modeId": "output-detective",
  "levelNumber": 6,
  "title": "Letters Are Numbers in Disguise",
  "difficulty": "intermediate",
  "estimatedMinutes": 3,
  "challengeType": "predict-output",
  "instructions": "A char participates in arithmetic. Choose the exact two lines of output.",
  "content": {
    "language": "java",
    "code": "char letter = 'A';\nSystem.out.println(letter + 1);\nSystem.out.println((char)(letter + 3));",
    "prompt": "What is printed?",
    "choices": [
      { "id": "a", "label": "66 then D" },
      { "id": "b", "label": "B then D" },
      { "id": "c", "label": "66 then 68" },
      { "id": "d", "label": "A1 then AD" }
    ]
  },
  "evaluation": { "strategy": "single-choice", "correctChoiceId": "a" },
  "hints": [
    "Before arithmetic, a char is widened to its Unicode number; 'A' is not zero.",
    "The cast in the second line converts the computed number back into a character before printing."
  ],
  "explanation": {
    "concept": "char arithmetic and casting",
    "summary": "'A' has code value 65, so letter + 1 is evaluated as an int and prints 66. In the second line 65 + 3 = 68 is cast back to char, which is the glyph D.",
    "details": "char, byte and short are automatically promoted to int in arithmetic. Without the (char) cast the result would print as a number again; with it, println receives a character value."
  },
  "rewards": { "xp": 20 },
  "version": 1
};
