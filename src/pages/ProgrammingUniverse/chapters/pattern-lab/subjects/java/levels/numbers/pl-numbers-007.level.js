export default {
  "id": "pl-numbers-007",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "numbers",
  "levelNumber": 7,
  "title": "Descending Number Triangle",
  "difficulty": "intermediate",
  "estimatedMinutes": 3,
  "challengeType": "code-completion",
  "instructions": "The missing line is the inner for-loop header. Write it so each row counts down from the current outer value to 1.",
  "content": {
    "language": "java",
    "prompt": "Type the missing inner loop header (the line marked ____):",
    "code": "for (int i = 4; i >= 1; i--) {\n    ____\n        System.out.print(j + \" \");\n    }\n    System.out.println();\n}",
    "missingLine": "____  // inner for-loop header controlling j",
    "patternRows": [
      "4 3 2 1",
      "3 2 1",
      "2 1",
      "1"
    ],
    "expectedOutput": "4 3 2 1\n3 2 1\n2 1\n1"
  },
  "evaluation": {
    "strategy": "structured-answer",
    "acceptedAnswers": [
      "for (int j = i; j >= 1; j--) {",
      "for (int j = i; j >= 1; j--)",
      "for(int j=i;j>=1;j--){",
      "for(int j=i;j>=1;j--)"
    ]
  },
  "hints": [
    "Row 4 must start printing at 4, so the inner counter should begin at the outer variable's current value, not at a fixed number.",
    "The rows count downward, so the update expression must move j toward 1 and the condition must stop after the value 1 is printed."
  ],
  "explanation": {
    "concept": "inner loop inheriting the outer counter",
    "summary": "The header for (int j = i; j >= 1; j--) starts each row at the outer value i, counts down while j is at least 1, and therefore prints i, i-1, ... , 1.",
    "details": "Because the outer loop goes 4, 3, 2, 1, the inner start point shrinks in lockstep, giving rows 4 3 2 1 down to 1. A condition of j > 1 would drop the final 1 from every row, and j++ would loop forever against the >= guard."
  },
  "rewards": {
    "xp": 22
  },
  "version": 1
};
