export default {
  "id": "cq-cb-003",
  "chapterId": "code-quest",
  "subjectId": "java-fundamentals",
  "modeId": "code-builder",
  "levelNumber": 3,
  "title": "Assemble the Even-Counter",
  "difficulty": "beginner",
  "estimatedMinutes": 3,
  "challengeType": "code-ordering",
  "instructions": "Put the statements in the order that scans the whole array and tallies the even numbers.",
  "content": {
    "language": "java",
    "codeBefore": "int[] nums = {3, 8, 14, 5};",
    "codeAfter": "        }\n    }\n    System.out.println(count);",
    "prompt": "Target output for this data: 2",
    "blocks": [
      { "id": "e3", "code": "    if (nums[i] % 2 == 0) {" },
      { "id": "e1", "code": "int count = 0;" },
      { "id": "e4", "code": "        count++;" },
      { "id": "e2", "code": "for (int i = 0; i < nums.length; i++) {" }
    ]
  },
  "evaluation": { "strategy": "ordered-blocks", "expectedOrder": ["e1", "e2", "e3", "e4"] },
  "hints": [
    "The tally box must exist before the walk over the array begins, or there is nothing to add to.",
    "Inspect one element at a time: the divisibility test comes before the reaction to it, and the reaction sits deepest."
  ],
  "explanation": {
    "concept": "Counting with a loop plus a conditional test",
    "summary": "First the counter is created at zero, then the loop walks every index, the test checks whether the current element divides by two without remainder, and only matching elements bump the counter. For {3, 8, 14, 5} the count ends at 2.",
    "details": "Remainder testing uses %: an element is even exactly when nums[i] % 2 == 0. Declaring the counter inside the loop would reset it on every pass and the tally would be wrong."
  },
  "rewards": { "xp": 17 },
  "version": 1
};
