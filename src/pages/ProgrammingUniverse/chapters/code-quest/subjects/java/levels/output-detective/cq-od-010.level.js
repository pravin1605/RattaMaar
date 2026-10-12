export default {
  "id": "cq-od-010",
  "chapterId": "code-quest",
  "subjectId": "java-fundamentals",
  "modeId": "output-detective",
  "levelNumber": 10,
  "title": "The Variable Inside the Inner Braces",
  "difficulty": "advanced",
  "estimatedMinutes": 5,
  "challengeType": "predict-output",
  "instructions": "A block declares its own variable over a class-level one. Pick the exact output.",
  "content": {
    "language": "java",
    "code": "public class Main {\n    static int total = 100;\n    public static void main(String[] args) {\n        {\n            int total = 7;\n            total++;\n            System.out.println(total);\n        }\n        System.out.println(total);\n    }\n}",
    "prompt": "What is printed?",
    "choices": [
      { "id": "a", "label": "8 then 100" },
      { "id": "b", "label": "8 then 8" },
      { "id": "c", "label": "7 then 100" },
      { "id": "d", "label": "A compile error: two variables cannot share one name" }
    ]
  },
  "evaluation": { "strategy": "single-choice", "correctChoiceId": "a" },
  "hints": [
    "Inside the inner braces the name resolves to the nearest declaration, which is the block-local one.",
    "A variable born in a block disappears when the block ends; the class-level value was never touched."
  ],
  "explanation": {
    "concept": "Variable shadowing and block scope",
    "summary": "The block-local total starts at 7, is bumped to 8 and printed. When the block closes that local dies, so the second print resolves to the static field, which still holds 100.",
    "details": "A local in a block shadows a class field of the same name (this is legal; shadowing another local from the enclosing method would be a compile error). Outside the block the simple name again refers to the field."
  },
  "rewards": { "xp": 30 },
  "version": 1
};
