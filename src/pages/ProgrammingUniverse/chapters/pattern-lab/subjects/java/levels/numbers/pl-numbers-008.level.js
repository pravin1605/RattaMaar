export default {
  "id": "pl-numbers-008",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "numbers",
  "levelNumber": 8,
  "title": "Odd Number Triangle",
  "difficulty": "intermediate",
  "estimatedMinutes": 3,
  "challengeType": "pattern-prediction",
  "instructions": "Track the odd counter carefully: it changes with every single print, not once per row. Choose the output.",
  "content": {
    "language": "java",
    "prompt": "What does this code print for n = 4?",
    "code": "int n = 4;\nint odd = 1;\nfor (int i = 1; i <= n; i++) {\n    for (int j = 1; j <= i; j++) {\n        System.out.print(odd + \" \");\n        odd += 2;\n    }\n    System.out.println();\n}",
    "patternRows": [
      "1",
      "3 5",
      "7 9 11",
      "13 15 17 19"
    ],
    "expectedOutput": "1\n3 5\n7 9 11\n13 15 17 19",
    "choices": [
      {
        "id": "advancing-odds",
        "label": "1 / 3 5 / 7 9 11 / 13 15 17 19 - the counter keeps advancing between rows"
      },
      {
        "id": "reset-rows",
        "label": "1 / 1 3 / 1 3 5 / 1 3 5 7 - every row restarts at the first odd number"
      },
      {
        "id": "row-copies",
        "label": "1 / 3 3 / 5 5 5 / 7 7 7 7 - each row repeats one odd number"
      }
    ]
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "advancing-odds"
  },
  "hints": [
    "odd is declared once outside both loops and grows by 2 after every individual print.",
    "Count the prints before each row begins: row 3 starts only after three values have already been consumed."
  ],
  "explanation": {
    "concept": "shared stepping counter",
    "summary": "Because odd survives across rows and steps by 2 per print, the triangle consumes 1, then 3 and 5, then 7, 9, 11, then 13, 15, 17, 19 - consecutive odds in Floyd-like rows.",
    "details": "Row i makes i prints, so 1+2+3 = 6 values are used before the last row; the 7th odd number is 13, which starts row 4. Declaring odd inside the outer loop would produce the restarting-rows distractor instead."
  },
  "rewards": {
    "xp": 24
  },
  "version": 1
};
