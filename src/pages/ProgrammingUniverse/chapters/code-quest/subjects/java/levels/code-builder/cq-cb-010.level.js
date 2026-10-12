export default {
  "id": "cq-cb-010",
  "chapterId": "code-quest",
  "subjectId": "java-fundamentals",
  "modeId": "code-builder",
  "levelNumber": 10,
  "title": "Grow a Mutable Text and Harvest It",
  "difficulty": "advanced",
  "estimatedMinutes": 4,
  "challengeType": "fill-blanks",
  "instructions": "Three pieces of the mutable-text workflow are blank. Fill them so the program prints Hi?.",
  "content": {
    "language": "java",
    "code": "____ sb = new StringBuilder(\"Hi\");\nsb.____(\"?\");\nString text = sb.____();\nSystem.out.println(text);",
    "prompt": "Finished output: Hi?",
    "blanks": [
      { "placeholder": "____", "context": "____ sb = new StringBuilder(\"Hi\");" },
      { "placeholder": "____", "context": "sb.____(\"?\");" },
      { "placeholder": "____", "context": "String text = sb.____();" }
    ]
  },
  "evaluation": { "strategy": "fill-blanks", "expectedBlanks": ["StringBuilder", "append", "toString"] },
  "hints": [
    "The variable on the left of the assignment must carry exactly the type that the allocation on the right side constructs.",
    "The second slot calls the mutation operation that tacks extra characters onto the end of the live buffer.",
    "A String variable cannot receive the builder directly, so the third slot harvests an immutable copy through the conversion method every builder offers."
  ],
  "explanation": {
    "concept": "StringBuilder construction, mutation and conversion",
    "summary": "Declare sb with the builder type shown on the right-hand side, extend its contents in place with append(\"?\"), then convert the finished buffer to an immutable String with toString() before assigning it. The print shows Hi?.",
    "details": "StringBuilder lives in java.lang like String, so no import is needed. Assigning sb itself to a String variable would not compile; the explicit conversion call is the standard exit step from the builder workflow. concat would create a new String rather than reuse the buffer, which is the point of the builder."
  },
  "rewards": { "xp": 30 },
  "version": 1
};
