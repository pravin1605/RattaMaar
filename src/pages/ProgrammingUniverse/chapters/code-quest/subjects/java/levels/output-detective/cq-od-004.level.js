export default {
  "id": "cq-od-004",
  "chapterId": "code-quest",
  "subjectId": "java-fundamentals",
  "modeId": "output-detective",
  "levelNumber": 4,
  "title": "The Truncated Quotient",
  "difficulty": "beginner",
  "estimatedMinutes": 3,
  "challengeType": "predict-output",
  "instructions": "Type the exact three lines this snippet prints, one per line.",
  "content": {
    "language": "java",
    "code": "int a = 7;\nint b = 2;\nSystem.out.println(a / b);\nSystem.out.println(a / 2.0);\nSystem.out.println(a % b);",
    "answerLabel": "Three lines of output",
    "answerPlaceholder": "line1\nline2\nline3"
  },
  "evaluation": { "strategy": "exact-output", "expectedOutput": "3\n3.5\n1" },
  "hints": [
    "Dividing one whole number by another drops the fractional part instead of rounding.",
    "Writing one operand with a decimal point forces floating-point arithmetic; the modulo operator reports only what the division discarded."
  ],
  "explanation": {
    "concept": "Integer division and the remainder operator",
    "summary": "7 / 2 truncates toward zero to 3, so the first line prints 3. 7 / 2.0 promotes the int to a double and prints 3.5. 7 % 2 gives the leftover after the truncated division, which is 1.",
    "details": "Java integer division never produces a decimal: the fraction is thrown away, not rounded up. The % operator complements / : (a / b) * b + (a % b) equals a for positive operands."
  },
  "rewards": { "xp": 16 },
  "version": 1
};
