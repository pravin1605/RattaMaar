export default {
  "id": "cq-bh-005",
  "chapterId": "code-quest",
  "subjectId": "java-fundamentals",
  "modeId": "bug-hunter",
  "levelNumber": 5,
  "title": "Predict the Output Once Break Is Added",
  "difficulty": "beginner",
  "estimatedMinutes": 3,
  "challengeType": "debug-output",
  "instructions": "This switch is missing break statements, so it falls through. Imagine every case body ends with break; — what does the fixed program print?",
  "content": {
    "language": "java",
    "code": "int day = 3;\nswitch (day) {\n    case 1: System.out.println(\"Mon\");\n    case 2: System.out.println(\"Tue\");\n    case 3: System.out.println(\"Wed\");\n    case 4: System.out.println(\"Thu\");\n}",
    "prompt": "Output of the corrected switch?",
    "choices": [
      { "id": "a", "label": "Wed" },
      { "id": "b", "label": "Wed and Thu" },
      { "id": "c", "label": "Mon, Tue, Wed and Thu" },
      { "id": "d", "label": "Nothing at all" }
    ]
  },
  "evaluation": { "strategy": "single-choice", "correctChoiceId": "a" },
  "hints": [
    "A break ends the whole switch, not just the current case.",
    "Execution enters at the matching label; with a stop at the end of each body it cannot drift into later labels."
  ],
  "explanation": {
    "concept": "switch fall-through and the break statement",
    "summary": "day matches case 3, so Wed is printed. With break; after each case body the switch exits immediately, and only Wed appears. Without it, execution continues into case 4 and also prints Thu.",
    "details": "Java switch labels only mark entry points; control flows downward until a break, return, or the end of the switch. Fall-through is legal but is the usual cause of surprise multi-case output."
  },
  "rewards": { "xp": 17 },
  "version": 1
};
