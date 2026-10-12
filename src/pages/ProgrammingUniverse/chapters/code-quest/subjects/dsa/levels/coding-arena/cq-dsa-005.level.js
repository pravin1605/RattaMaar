export default {
  chapterId: "code-quest",
  id: "cq-dsa-005",
  subjectId: "dsa",
  modeId: "coding-arena",
  levelNumber: 5,
  title: "Order the Linked-List Reversal",
  difficulty: "intermediate",
  estimatedMinutes: 4,
  challengeType: "code-ordering",
  instructions: "Arrange the four statements so the loop correctly reverses a singly linked list.",
  content: {
    language: "java",
    code: "Node prev = null;\nNode curr = head;\nwhile (curr != null) {\n    // place the four statements in the right order\n}\nhead = prev;",
    blocks: [
      { id: "r1", code: "prev = curr;" },
      { id: "r2", code: "curr = next;" },
      { id: "r3", code: "Node next = curr.next;" },
      { id: "r4", code: "curr.next = prev;" },
    ],
  },
  evaluation: { strategy: "ordered-blocks", expectedOrder: ["r3", "r4", "r1", "r2"] },
  hints: [
    "Save the successor in a temporary before the current link is destroyed — after that step the rest of the list is unreachable.",
    "Point the current node backwards first, then step prev onto it, and only then move curr to the saved successor.",
  ],
  explanation: {
    concept: "Iterative linked-list reversal",
    summary: "Correct order: Node next = curr.next; -> curr.next = prev; -> prev = curr; -> curr = next; — three pointer moves plus one save per node.",
    details: "curr.next = prev overwrites the only reference to the remainder of the list, so next must be captured first. prev ends on the old tail (the new head), which is why head = prev follows the loop. O(n) time, O(1) extra space; skipping the save creates the classic 'list vanishes after the first node' bug.",
  },
  rewards: { xp: 22 },
  version: 1,
};
