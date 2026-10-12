export default {
  "chapterId": "code-quest",
  "id": "java-output-detective-syntax-basics-001",
  "subjectId": "java-fundamentals",
  "modeId": "output-detective",
  "levelNumber": 1,
  "title": "Read the First Output",
  "difficulty": "beginner",
  "estimatedMinutes": 1,
  "challengeType": "predict-output",
  "instructions": "Choose the exact text printed by this Java statement.",
  "content": {
    "language": "java",
    "code": "System.out.println(\"Hello, Java!\");",
    "choices": [
      {
        "id": "a",
        "label": "Hello, Java!"
      },
      {
        "id": "b",
        "label": "\"Hello, Java!\" including quotation marks"
      },
      {
        "id": "c",
        "label": "Nothing is printed"
      }
    ]
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "a"
  },
  "hints": [
    "println displays the string value, not the source-code quotation marks."
  ],
  "explanation": {
    "concept": "Printing a string",
    "summary": "The quotation marks delimit a string in Java source code. They are not included in the printed output."
  },
  "rewards": {
    "xp": 10
  },
  "unlocks": {
    "nextLevelId": null
  },
  "version": 1
};
