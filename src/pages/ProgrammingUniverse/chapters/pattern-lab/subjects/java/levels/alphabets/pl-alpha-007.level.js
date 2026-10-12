export default {
  "id": "pl-alpha-007",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "alphabets",
  "levelNumber": 7,
  "title": "Zig-Zag Letters: Order the Snake Loop",
  "difficulty": "intermediate",
  "estimatedMinutes": 5,
  "challengeType": "code-ordering",
  "instructions": "Arrange the blocks so odd rows read A upward and even rows read backwards from their own last letter, producing the output shown.",
  "content": {
    "language": "java",
    "prompt": "Reorder these seven blocks into the program that prints the zig-zag below.",
    "blocks": [
      {
        "id": "b5",
        "code": "    for (int k = 0; k < i; k++) { if (k > 0) System.out.print(\" \"); System.out.print(forward ? (char) ('A' + k) : (char) (start - k)); }"
      },
      {
        "id": "b1",
        "code": "int n = 4;"
      },
      {
        "id": "b7",
        "code": "}"
      },
      {
        "id": "b3",
        "code": "    boolean forward = (i % 2 == 1);"
      },
      {
        "id": "b6",
        "code": "    System.out.println();"
      },
      {
        "id": "b2",
        "code": "for (int i = 1; i <= n; i++) {"
      },
      {
        "id": "b4",
        "code": "    char start = forward ? 'A' : (char) ('A' + i - 1);"
      }
    ],
    "patternRows": [
      "A",
      "B A",
      "A B C",
      "D C B A"
    ],
    "patternVariables": [
      "i=1  forward=true",
      "i=2  forward=false  start=B",
      "i=3  forward=true",
      "i=4  forward=false  start=D"
    ],
    "expectedOutput": "A\nB A\nA B C\nD C B A"
  },
  "evaluation": {
    "strategy": "ordered-blocks",
    "expectedOrder": [
      "b1",
      "b2",
      "b3",
      "b4",
      "b5",
      "b6",
      "b7"
    ]
  },
  "hints": [
    "A variable must be declared before any later line reads it, so the row counter setup comes before the code that tests the parity of that counter.",
    "The line that ends the row runs once per outer iteration, after every letter of that row has been printed, and the closing brace is the final block."
  ],
  "explanation": {
    "concept": "direction flag shared by one row",
    "summary": "The parity flag and the row's starting letter must both be decided before the inner loop reads them, and the line break must come after the inner loop.",
    "details": "forward is true for odd i, so those rows print (char) ('A' + k) and climb upward. For even i, start holds the row's last letter (char) ('A' + i - 1) and the loop subtracts k, walking back down to A. A space is printed before each token except the first, so rows never gain trailing blanks. Reading the blocks in the wrong order either uses an undeclared variable or breaks the row before its letters are printed."
  },
  "rewards": {
    "xp": 26
  },
  "prerequisites": [
    "pl-alpha-006"
  ],
  "version": 1
};
