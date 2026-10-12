export default {
  "id": "pl-digits-007",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "digits",
  "levelNumber": 7,
  "title": "The Product-of-Digits Zero Trap",
  "difficulty": "intermediate",
  "estimatedMinutes": 3,
  "challengeType": "predict-output",
  "instructions": "Predict the printed result of the product loop for the given input.",
  "content": {
    "language": "java",
    "prompt": "What does this program print for value = 205?",
    "code": "int value = 205;\nint product = 1;\nwhile (value > 0) {\n    product *= value % 10;\n    value /= 10;\n}\nSystem.out.println(product);",
    "choices": [
      { "id": "zero", "label": "0" },
      { "id": "ten", "label": "10" },
      { "id": "seven", "label": "7" },
      { "id": "one", "label": "1" }
    ]
  },
  "evaluation": { "strategy": "single-choice", "correctChoiceId": "zero" },
  "hints": [
    "The digits arrive from the right, but every digit is visited before the loop ends.",
    "Ask yourself what multiplying by a single particular digit does to any running product."
  ],
  "explanation": {
    "concept": "multiplicative zero property",
    "summary": "205 contains a 0 digit, and product *= 0 collapses the accumulator to 0 for the rest of the loop.",
    "details": "Iterations: product = 1*5 = 5, then 5*0 = 0, then 0*2 = 0. Unlike digit sums, digit products are destroyed by a single zero — a classic interview trap."
  },
  "rewards": { "xp": 20 },
  "version": 1
};
