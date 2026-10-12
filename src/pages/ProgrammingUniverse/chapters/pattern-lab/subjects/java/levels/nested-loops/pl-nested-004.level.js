export default {
  "id": "pl-nested-004",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "loop-tracer",
  "categoryId": "nested-loops",
  "levelNumber": 4,
  "title": "Spot the Loop That Never Ends",
  "difficulty": "intermediate",
  "estimatedMinutes": 3,
  "challengeType": "multiple-choice",
  "instructions": "One loop in this program can never satisfy its exit condition. Choose the loop and the reason.",
  "content": {
    "language": "java",
    "prompt": "Which loop runs forever, and why?",
    "code": "for (int i = 1; i <= 3; i++) {\n    int j = 1;\n    while (j <= 3) {\n        System.out.println(i + \" \" + j);\n    }\n    j++;\n}",
    "choices": [
      { "id": "outer", "label": "The outer for loop, because i is never compared with anything it can reach" },
      { "id": "inner", "label": "The while loop, because j is not modified inside its body" },
      { "id": "none", "label": "Neither loop: both conditions eventually become false" }
    ]
  },
  "evaluation": {
    "strategy": "single-choice",
    "correctChoiceId": "inner"
  },
  "hints": [
    "A while loop can only terminate if its body changes a variable that appears in the condition.",
    "Check exactly which statements sit inside the while braces: does any of them touch j?"
  ],
  "explanation": {
    "concept": "loop progress and termination",
    "summary": "The while loop never terminates because its body only prints; the statement that changes j sits outside the loop.",
    "details": "j is initialized to 1 before the while loop, and j++ is placed after the loop closes, so it is unreachable while the condition is still true. The condition j <= 3 therefore stays true forever, printing line after line and preventing the outer loop from ever reaching its next pass. The outer for loop itself is fine because i++ is part of its header."
  },
  "rewards": { "xp": 18 },
  "prerequisites": ["pl-nested-003"],
  "version": 1
};
