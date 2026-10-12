export default {
  "id": "cq-cb-009",
  "chapterId": "code-quest",
  "subjectId": "java-fundamentals",
  "modeId": "code-builder",
  "levelNumber": 9,
  "title": "Build the Menu Loop Skeleton",
  "difficulty": "advanced",
  "estimatedMinutes": 5,
  "challengeType": "code-ordering",
  "instructions": "Order the four statements into a working interactive menu pass inside the endless loop.",
  "content": {
    "language": "java",
    "codeBefore": "Scanner scanner = new Scanner(System.in);\nwhile (true) {",
    "codeAfter": "}",
    "prompt": "Each pass: invite a choice, read it, allow the quit code to escape, otherwise handle the choice.",
    "blocks": [
      { "id": "m3", "code": "    if (choice == 0) break;" },
      { "id": "m1", "code": "    System.out.print(\"Enter choice (0 to exit): \");" },
      { "id": "m4", "code": "    System.out.println(\"Processing \" + choice);" },
      { "id": "m2", "code": "    int choice = scanner.nextInt();" }
    ]
  },
  "evaluation": { "strategy": "ordered-blocks", "expectedOrder": ["m1", "m2", "m3", "m4"] },
  "hints": [
    "The program cannot react to a decision until the decision has been asked for and captured.",
    "The escape hatch is checked before any handling work, so the quit code never gets processed as a real request."
  ],
  "explanation": {
    "concept": "Menu-driven program structure",
    "summary": "A menu pass prompts first, then reads the selection into a variable, then tests the quit code and breaks out of the endless loop, and only after that handles the choice. Nothing can be read or tested before the prompt makes the value available.",
    "details": "The variable declared in the second statement is in scope for the two statements that follow it, which is another reason the read cannot come later. Placing the break test after the handling line would process the quit code once before escaping."
  },
  "rewards": { "xp": 28 },
  "version": 1
};
