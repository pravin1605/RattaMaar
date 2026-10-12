export default {
  "id": "cq-bh-008",
  "chapterId": "code-quest",
  "subjectId": "java-fundamentals",
  "modeId": "bug-hunter",
  "levelNumber": 8,
  "title": "The Sum Read Too Early",
  "difficulty": "intermediate",
  "estimatedMinutes": 3,
  "challengeType": "multiple-choice",
  "instructions": "An accumulator is used before any value is stored in it. What happens when this class is compiled and run?",
  "content": {
    "language": "java",
    "code": "public static void main(String[] args) {\n    int sum;\n    int[] nums = {4, 5};\n    for (int i = 0; i < nums.length; i++) {\n        sum = sum + nums[i];\n    }\n    System.out.println(sum);\n}",
    "prompt": "What is the outcome?",
    "choices": [
      { "id": "compile-error", "label": "Compile error: the local variable sum might not have been initialized." },
      { "id": "prints-zero", "label": "Prints 0 because fresh locals start at zero." },
      { "id": "prints-nine", "label": "Prints 9 because the loop assigns sum anyway." },
      { "id": "npe", "label": "Runtime NullPointerException on the first loop pass." }
    ]
  },
  "evaluation": { "strategy": "single-choice", "correctChoiceId": "compile-error" },
  "hints": [
    "Array slots get default values automatically, but plain local variables declared inside a method do not.",
    "The very statement that reads the variable happens before any value has ever been placed in it."
  ],
  "explanation": {
    "concept": "Definite assignment for local variables",
    "summary": "sum is declared without a value and the first loop statement reads it. Java requires every local to be definitely assigned before use, so the compiler rejects the program with the message that the variable might not have been initialized — nothing runs at all.",
    "details": "Unlike array elements or fields, local variables have no default. The fix is to store a starting value in sum before the loop. No exception can occur because the class never compiles."
  },
  "rewards": { "xp": 22 },
  "version": 1
};
