export default {
  "id": "cq-cb-008",
  "chapterId": "code-quest",
  "subjectId": "java-fundamentals",
  "modeId": "code-builder",
  "levelNumber": 8,
  "title": "Wire Up the For-Each Sum",
  "difficulty": "intermediate",
  "estimatedMinutes": 4,
  "challengeType": "fill-blanks",
  "instructions": "Complete the enhanced for loop: name the source of elements, the way each one joins the running total, and what gets printed.",
  "content": {
    "language": "java",
    "code": "int[] numbers = {4, 5, 6};\nint total = 0;\nfor (int n : ____) {\n    total ____ n;\n}\nSystem.out.println(____);",
    "prompt": "The finished program should print 15.",
    "blanks": [
      { "placeholder": "____", "context": "for (int n : ____) {" },
      { "placeholder": "____", "context": "    total ____ n;" },
      { "placeholder": "____", "context": "System.out.println(____);" }
    ]
  },
  "evaluation": { "strategy": "fill-blanks", "expectedBlanks": [["numbers"], ["+=", "total + n"], "total"] },
  "hints": [
    "The enhanced loop reads one entire array as its source, so the slot after the colon holds the container's name, not an index.",
    "Each pass folds the current element into the running result with the compound addition form, and the answer line reports the accumulator after the loop closes."
  ],
  "explanation": {
    "concept": "Enhanced for loop (for-each) accumulation",
    "summary": "for (int n : numbers) walks every element without an index. total += n adds each element to the accumulator, so 4 + 5 + 6 settles to 15, and printing total after the loop reports that sum.",
    "details": "Writing n inside the print slot would only show the last visited element. The compound operator may also be spelled total = total + n; both forms compute identically."
  },
  "rewards": { "xp": 25 },
  "version": 1
};
