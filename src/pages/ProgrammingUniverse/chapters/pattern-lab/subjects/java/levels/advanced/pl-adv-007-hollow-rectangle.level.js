export default {
  "id": "pl-adv-007",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "advanced",
  "levelNumber": 7,
  "title": "Hollow Rectangle: Count the Gap",
  "difficulty": "intermediate",
  "estimatedMinutes": 4,
  "challengeType": "fill-in-blank",
  "instructions": "The program prints a hollow rectangle of # characters. Enter how many space characters appear inside each middle row.",
  "content": {
    "language": "java",
    "prompt": "Border positions print #, interior positions print a space. For the rectangle shown, how many blanks sit between the two # of every middle row?",
    "code": "for (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= 8; j++) {\n        if (i == 1 || i == 3 || j == 1 || j == 8) {\n            System.out.print(\"#\");\n        } else {\n            System.out.print(\" \");\n        }\n    }\n    System.out.println();\n}",
    "patternRows": [
      "########",
      "#      #",
      "########"
    ]
  },
  "evaluation": {
    "strategy": "blank-count",
    "expectedCount": 6
  },
  "hints": [
    "A hollow shape keeps only the first and last column on the middle rows; count what remains between them.",
    "The full row width includes both border characters, so subtract both of them from the width."
  ],
  "explanation": {
    "concept": "hollow rectangle border conditions",
    "summary": "Each middle row prints #, then 6 spaces, then #, because the interior spans width minus the two border columns: 8 - 2 = 6.",
    "details": "The four-part test i == 1 || i == 3 || j == 1 || j == 8 marks every border cell: top row, bottom row, left column, right column. Only cells failing all four tests become blanks, and there are (8 - 2) * (3 - 2) = 6 such cells, all on row 2. Generalising, a hollow rectangle of width w has w - 2 interior blanks per middle row; forgetting the j border conditions (or using && instead of ||) is the classic bug that fills the rectangle in or leaves it a plus shape."
  },
  "rewards": { "xp": 24 },
  "version": 1
};
