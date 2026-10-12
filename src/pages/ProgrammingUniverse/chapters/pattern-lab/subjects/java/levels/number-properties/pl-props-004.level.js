export default {
  "id": "pl-props-004",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "number-properties",
  "levelNumber": 4,
  "title": "Is 91 Really Prime",
  "difficulty": "beginner",
  "estimatedMinutes": 3,
  "challengeType": "true-false",
  "instructions": "Apply the i * i <= n divisor test mentally to n = 91 and answer the statement.",
  "content": {
    "language": "java",
    "prompt": "Statement: after running the trial-division primality test below on n = 91, isPrime stays at its initial value. True or false?",
    "code": "int n = 91;\nboolean isPrime = true;\nfor (int i = 2; i * i <= n; i++) {\n    if (n % i == 0) {\n        isPrime = false;\n        break;\n    }\n}",
    "choices": [
      { "id": "t", "label": "True" },
      { "id": "f", "label": "False" }
    ]
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "f"
  },
  "hints": [
    "Try every candidate 2, 3, 4, ... while the square of the candidate stays within 91; one of them divides exactly.",
    "91 is odd and its digits do not sum to a multiple of 3, so keep testing larger candidates before deciding."
  ],
  "explanation": {
    "concept": "counter-intuitive composite numbers",
    "summary": "The statement is answered by running the test: 91 = 7 * 13, and the loop reaches i = 7 (since 7 * 7 = 49 <= 91), so 91 % 7 == 0 flips isPrime to false.",
    "details": "91 looks prime because it dodges the small divisors 2, 3, 4, 5, 6, but the bound i * i <= n guarantees every composite exposes a factor no larger than its square root (about 9.5 here). Never trust a number that merely seems odd."
  },
  "rewards": { "xp": 16 },
  "prerequisites": ["pl-props-003"],
  "version": 1
};
