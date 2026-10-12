export default {
  "id": "pl-adv-003",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "advanced",
  "levelNumber": 3,
  "title": "Floyd's Triangle: Continue the Count",
  "difficulty": "beginner",
  "estimatedMinutes": 2,
  "challengeType": "pattern-prediction",
  "instructions": "Floyd's triangle writes consecutive natural numbers row by row. Choose the row that the program prints fourth.",
  "content": {
    "language": "java",
    "prompt": "A single counter is shared by all rows and increases after every printed number. Row 4 continues the count where row 3 stopped. Which row is printed fourth?",
    "code": "int count = 1;\nfor (int i = 1; i <= 4; i++) {\n    for (int j = 1; j <= i; j++) {\n        System.out.print(count + \" \");\n        count = count + 1;\n    }\n    System.out.println();\n}",
    "patternRows": [
      "1",
      "2 3",
      "4 5 6"
    ],
    "choices": [
      { "id": "floyd-78910", "label": "7 8 9 10" },
      { "id": "floyd-1234", "label": "1 2 3 4" },
      { "id": "floyd-6789", "label": "6 7 8 9" },
      { "id": "floyd-789", "label": "7 8 9" }
    ]
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "floyd-78910"
  },
  "hints": [
    "The counter never resets between rows; find the last number printed by the third row and keep counting from there.",
    "The fourth row must also contain exactly four numbers, one per inner-loop pass."
  ],
  "explanation": {
    "concept": "Floyd's triangle and a shared outer counter",
    "summary": "Rows 1-3 consumed numbers 1 through 6, so the fourth row prints the next four values: 7 8 9 10.",
    "details": "Unlike plain number pyramids that restart per row, Floyd's triangle keeps one global counter incremented inside the inner loop. After rows of lengths 1, 2, 3 the counter sits at 7, and row 4 prints i = 4 values. The distractor 6 7 8 9 re-prints the last value of row 3, and 1 2 3 4 wrongly resets the counter."
  },
  "rewards": { "xp": 15 },
  "version": 1
};
