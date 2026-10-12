export default {
  "id": "cq-od-003",
  "chapterId": "code-quest",
  "subjectId": "java-fundamentals",
  "modeId": "output-detective",
  "levelNumber": 3,
  "title": "Add First or Glue First?",
  "difficulty": "beginner",
  "estimatedMinutes": 2,
  "challengeType": "predict-output",
  "instructions": "Java evaluates the + operators left to right. Predict both printed lines.",
  "content": {
    "language": "java",
    "code": "System.out.println(2 + 3 + \"Java\");\nSystem.out.println(\"Java\" + 2 + 3);",
    "prompt": "What is printed?",
    "choices": [
      { "id": "a", "label": "5Java then Java23" },
      { "id": "b", "label": "23Java then Java23" },
      { "id": "c", "label": "5Java then Java5" }
    ]
  },
  "evaluation": { "strategy": "single-choice", "correctChoiceId": "a" },
  "hints": [
    "Left operand wins: a number plus a number is arithmetic, but a number joined to a text value is glued together.",
    "Walk each line strictly from left to right, updating the running type as you go."
  ],
  "explanation": {
    "concept": "String concatenation versus arithmetic, left to right",
    "summary": "In the first line, 2 + 3 is computed as integer addition (5) before the text is seen, so the number 5 is converted and glued to \"Java\" giving 5Java. In the second line the first operator meets a text value, so everything after it is concatenated one token at a time, giving Java23.",
    "details": "The + operator is overloaded: if either operand is a String the operation is concatenation; otherwise it is numeric addition. Evaluation order (left to right) decides which interpretation applies at each step."
  },
  "rewards": { "xp": 15 },
  "version": 1
};
