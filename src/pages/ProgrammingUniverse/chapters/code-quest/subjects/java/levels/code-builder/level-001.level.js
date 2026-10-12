export default {
  "chapterId": "code-quest",
  "id": "java-code-builder-syntax-basics-001",
  "subjectId": "java-fundamentals",
  "modeId": "code-builder",
  "levelNumber": 1,
  "title": "Complete the Print Statement",
  "difficulty": "beginner",
  "estimatedMinutes": 1,
  "challengeType": "code-completion",
  "instructions": "Choose the missing method call that prints a message to the console.",
  "content": {
    "language": "java",
    "codeBefore": "class Main {\n  public static void main(String[] args) {",
    "missingLine": "___________(\"Ready to code!\");",
    "codeAfter": "  }\n}",
    "choices": [
      {
        "id": "print",
        "label": "System.out.print"
      },
      {
        "id": "read",
        "label": "System.in.read"
      },
      {
        "id": "length",
        "label": "String.length"
      }
    ]
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "print"
  },
  "hints": [
    "Look for the standard output stream on System."
  ],
  "explanation": {
    "concept": "Console output",
    "summary": "System.out.print writes text to standard output. println also appends a line break."
  },
  "rewards": {
    "xp": 10
  },
  "unlocks": {
    "nextLevelId": null
  },
  "version": 1
};
