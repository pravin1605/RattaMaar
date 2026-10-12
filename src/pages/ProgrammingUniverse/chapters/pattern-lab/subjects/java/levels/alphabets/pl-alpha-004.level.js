export default {
  "id": "pl-alpha-004",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "alphabets",
  "levelNumber": 4,
  "title": "Alphabet Square: Pick the Printing Expression",
  "difficulty": "beginner",
  "estimatedMinutes": 3,
  "challengeType": "code-completion",
  "instructions": "The square must print the same row ABC on every iteration. Type the Java expression that replaces ____.",
  "content": {
    "language": "java",
    "prompt": "Which single expression, placed at ____, makes every row print ABC with no spaces?",
    "code": "int n = 3;\nfor (int i = 1; i <= n; i++) {\n    for (int j = 0; j < n; j++) {\n        System.out.print(____);\n    }\n    System.out.println();\n}",
    "patternRows": [
      "ABC",
      "ABC",
      "ABC"
    ],
    "patternVariables": [
      "i=1  j=0,1,2",
      "i=2  j=0,1,2",
      "i=3  j=0,1,2"
    ],
    "expectedOutput": "ABC\nABC\nABC",
    "answerLabel": "Java expression",
    "answerPlaceholder": "type the expression, no semicolon"
  },
  "evaluation": {
    "strategy": "structured-answer",
    "acceptedAnswers": [
      "(char) ('A' + j)",
      "(char)('A' + j)",
      "(char)('A'+j)",
      "(char)(65 + j)",
      "(char) (65 + j)",
      "(char)(65+j)"
    ]
  },
  "hints": [
    "The row must not depend on i, because all three rows are identical - only the inner counter moves.",
    "j runs from 0 to n-1, so it is already the distance from the alphabet's first letter; a bare char plus int arithmetic would print numbers instead of letters."
  ],
  "explanation": {
    "concept": "casting an offset back to a char",
    "summary": "The inner counter j is the offset from A, and the cast is required because 'A' + j is computed as an int.",
    "details": "In Java, char + int promotes to int, so System.out.print('A' + j) would print 65, 66, 67. Writing (char) ('A' + j) converts those code values back to A, B, C. Because the bound is n and not i, each row prints the same three letters, which is what makes the figure a square instead of a triangle."
  },
  "rewards": {
    "xp": 20
  },
  "prerequisites": [
    "pl-alpha-003"
  ],
  "version": 1
};
