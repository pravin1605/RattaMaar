export default {
  "id": "pl-pyr-002",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "pyramids",
  "levelNumber": 2,
  "title": "Inverted Star Pyramid: Supply the Counter Update",
  "difficulty": "beginner",
  "estimatedMinutes": 3,
  "challengeType": "code-completion",
  "instructions": "The sample output is the upright pyramid turned upside down. Type the missing for-header update expression.",
  "content": {
    "language": "java",
    "prompt": "Which update expression belongs in ____ so rows come out widest first and the loop still ends?",
    "code": "int n = 4;\nfor (int i = n; i >= 1; ____) {\n    for (int s = i; s < n; s++) System.out.print(\" \");\n    for (int j = 1; j <= 2 * i - 1; j++) System.out.print(\"*\");\n    System.out.println();\n}",
    "patternRows": [
      "*******",
      " *****",
      "  ***",
      "   *"
    ],
    "patternVariables": [
      "i=4  spaces=0  stars=7",
      "i=3  spaces=1  stars=5",
      "i=2  spaces=2  stars=3",
      "i=1  spaces=3  stars=1"
    ],
    "expectedOutput": "*******\n *****\n  ***\n   *",
    "answerLabel": "Update expression",
    "answerPlaceholder": "one Java statement, without a semicolon",
    "answerRows": 1
  },
  "evaluation": {
    "strategy": "case-insensitive-text",
    "expectedText": "i--"
  },
  "hints": [
    "The condition already keeps the loop alive while i is at least one, so i has to travel towards zero between rows.",
    "Use the shortest Java operator that lowers a counter by one, written straight after the variable name."
  ],
  "explanation": {
    "concept": "a loop that counts down",
    "summary": "Seeding i with n and stepping it down one row at a time reverses the row order without changing the row body.",
    "details": "Padding is still n - i spaces and the width is still 2 * i - 1 stars. Now that i falls from 4 to 1, padding grows from 0 to 3 while the star count shrinks from 7 to 1, which is an upside-down pyramid. If the update left i unchanged the test i >= 1 would stay true forever and the program would never finish."
  },
  "rewards": {
    "xp": 18
  },
  "prerequisites": [
    "pl-pyr-001"
  ],
  "version": 1
};
