export default {
  "id": "cq-cb-006",
  "chapterId": "code-quest",
  "subjectId": "java-fundamentals",
  "modeId": "code-builder",
  "levelNumber": 6,
  "title": "Stack the Grade Ladder",
  "difficulty": "intermediate",
  "estimatedMinutes": 4,
  "challengeType": "code-ordering",
  "instructions": "Order the statements so the highest band is tested first and exactly one grade is assigned.",
  "content": {
    "language": "java",
    "codeBefore": "int score = 74;",
    "codeAfter": "// then print the grade",
    "prompt": "For score 74 the ladder must select B.",
    "blocks": [
      { "id": "g4", "code": "else grade = \"C\";" },
      { "id": "g2", "code": "if (score >= 90) grade = \"A\";" },
      { "id": "g5", "code": "System.out.println(grade);" },
      { "id": "g1", "code": "String grade;" },
      { "id": "g3", "code": "else if (score >= 60) grade = \"B\";" }
    ]
  },
  "evaluation": { "strategy": "ordered-blocks", "expectedOrder": ["g1", "g2", "g3", "g4", "g5"] },
  "hints": [
    "The variable has to exist before any branch can store into it, and the reading of it can only happen after the chain has run.",
    "A ladder starts with the plain test, continues with paired alternatives in descending order, and ends with the catch-all arm."
  ],
  "explanation": {
    "concept": "if - else if - else ladder",
    "summary": "Declare grade, test the top band, then the middle band, then the catch-all, and finally print. Because only one arm of the chain executes, 74 skips the first test and is captured by the second, receiving B.",
    "details": "Each else if must follow a previous if arm, and the bare else must come last. Ordering the bands from high to low means each later test can assume all earlier thresholds failed."
  },
  "rewards": { "xp": 22 },
  "version": 1
};
