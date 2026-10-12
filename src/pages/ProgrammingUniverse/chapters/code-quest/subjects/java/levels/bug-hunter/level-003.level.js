export default {
  "id": "java-bug-hunter-syntax-basics-003",
  "chapterId": "code-quest",
  "subjectId": "java-fundamentals",
  "modeId": "bug-hunter",
  "levelNumber": 3,
  "title": "Match the Brackets",
  "difficulty": "beginner",
  "estimatedMinutes": 3,
  "challengeType": "find-and-fix",
  "instructions": "Find the correction needed to balance the parentheses.",
  "content": {
    "language": "java",
    "code": "System.out.println(\"Hello\";",
    "prompt": "Which correction fixes this line?",
    "choices": [
      {
        "id": "close-paren",
        "label": "Add ) before the semicolon."
      },
      {
        "id": "add-brace",
        "label": "Add } at the end."
      },
      {
        "id": "remove-dot",
        "label": "Remove the dot after System."
      }
    ]
  },
  "evaluation": {
    "strategy": "validated-correction",
    "expectedFixId": "close-paren"
  },
  "hints": [
    "Look at the opening parenthesis after println.",
    "Close the method call before ending the statement."
  ],
  "explanation": {
    "concept": "Balanced parentheses",
    "summary": "Method calls use a matching pair of parentheses. The correct line is System.out.println(\"Hello\");",
    "details": "The semicolon comes after the closing parenthesis."
  },
  "rewards": {
    "xp": 15
  },
  "version": 1
};
