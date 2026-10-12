export default {
  "id": "pl-nested-005",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "loop-tracer",
  "categoryId": "nested-loops",
  "levelNumber": 5,
  "title": "Off by One: Five Rows Wanted",
  "difficulty": "intermediate",
  "estimatedMinutes": 3,
  "challengeType": "find-and-fix",
  "instructions": "The loop should print exactly five rows numbered 1 to 5, but it prints too few. Choose the fix.",
  "content": {
    "language": "java",
    "prompt": "Which single change makes the program print rows 1 through 5?",
    "code": "// Goal: print exactly 5 rows numbered 1 to 5\nfor (int i = 1; i < 5; i++) {\n    System.out.println(\"row \" + i);\n}",
    "choices": [
      { "id": "leBound", "label": "Change the condition to i <= 5" },
      { "id": "step", "label": "Change i++ to i += 2" },
      { "id": "move", "label": "Print inside the condition line instead of the body" }
    ]
  },
  "evaluation": {
    "strategy": "validated-correction",
    "expectedFixId": "leBound"
  },
  "hints": [
    "Compare how many values i takes with the strict less-than test against the last index you want included.",
    "The final row is missing because the loop stops before the counter reaches the wanted upper value."
  ],
  "explanation": {
    "concept": "inclusive versus exclusive loop bounds",
    "summary": "Starting at 1 and testing i < 5 admits only the values 1 through 4, so one row is lost; the inclusive test i <= 5 keeps the fifth.",
    "details": "A for loop prints the body for every value of the counter that passes the condition. With i < 5 the value 5 fails the test and the loop exits early. Switching to <= includes the boundary value, producing rows 1, 2, 3, 4, 5. Stepping by two would skip values instead of restoring the missing one."
  },
  "rewards": { "xp": 20 },
  "prerequisites": ["pl-nested-004"],
  "version": 1
};
