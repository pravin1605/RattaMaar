export default [
  {
    "id": "java-int-008",
    "subjectId": "java-fundamentals",
    "subjectName": "Java",
    "difficulty": "intermediate",
    "type": "mcq",
    "question": "What is printed?\n\nMap<String, Integer> map = new HashMap<>();\nmap.put(\"a\", 1);\nmap.put(\"a\", 2);\nSystem.out.println(map.get(\"a\"));",
    "options": [
      { "id": "a", "text": "2 — put with an existing key replaces the value" },
      { "id": "b", "text": "1 — the first value is kept" },
      { "id": "c", "text": "3 — values are summed" },
      { "id": "d", "text": "Compilation error for duplicate key" }
    ],
    "correctOptionId": "a",
    "answer": "HashMap.put overwrites the value for an existing key and returns the previous value; get(\"a\") then reads 2.",
    "explanation": "Keys are unique; putting the same key again updates the mapping. This is why maps are used for counters and caches — the second put replaces, it does not add.",
    "keyPoints": ["Explains unique-key overwrite behaviour", "Mentions put returns the previous value", "Distinguishes keys from values"],
    "relatedPractice": "Code Quest → Variable Tracker: HashMap size changes level."
  },
  {
    "id": "java-int-009",
    "subjectId": "java-fundamentals",
    "subjectName": "Java",
    "difficulty": "intermediate",
    "type": "mcq",
    "question": "What does this print?\n\ntry {\n    System.out.print(\"A\");\n    throw new RuntimeException(\"boom\");\n} catch (RuntimeException e) {\n    System.out.print(\"B\");\n} finally {\n    System.out.print(\"C\");\n}",
    "options": [
      { "id": "a", "text": "AB" },
      { "id": "b", "text": "AC" },
      { "id": "c", "text": "ABC" },
      { "id": "d", "text": "BC" }
    ],
    "correctOptionId": "c",
    "answer": "A prints first, the exception moves control to the catch block which prints B, and the finally block always prints C — the output is ABC.",
    "explanation": "finally runs whether or not an exception occurred and whether or not it was caught (with rare exceptions such as System.exit). Interviewers expect you to describe the control flow, not just recite the rule.",
    "keyPoints": ["Traces throw → catch → finally order", "States that finally always executes", "Notes System.exit as the classic exception"],
    "relatedPractice": "Interview Arena → Output & Debug Round."
  },
  {
    "id": "java-int-010",
    "subjectId": "java-fundamentals",
    "subjectName": "Java",
    "difficulty": "advanced",
    "type": "short-answer",
    "question": "Explain the difference between == and equals() for objects, and why String s1 = \"java\"; String s2 = \"java\"; makes s1 == s2 true while two new String(\"java\") objects are not == equal.",
    "answer": "== compares references (for primitives, values). equals() is a method whose behaviour a class defines — String overrides it to compare character content. Literal strings are interned into the String pool, so s1 and s2 reference the same pooled object and == passes. Each new String(...) creates a distinct heap object, so == fails even though equals() returns true.",
    "explanation": "This question tests understanding of object identity vs logical equality and of string interning. A strong answer also warns that relying on == for strings is fragile: only compile-time literals and intern() calls are guaranteed pooled.",
    "keyPoints": ["== compares references, equals compares content by contract", "String overrides equals()", "Literal interning makes pool references identical", "new String creates a separate object", "Recommendation: always use equals() for string content checks"],
    "relatedPractice": "Code Quest → Concept Quest: String pool level."
  }
];
