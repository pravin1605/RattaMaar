export default [
  {
    "id": "dsa-int-008",
    "subjectId": "dsa",
    "subjectName": "Data Structures & Algorithms",
    "difficulty": "beginner",
    "type": "mcq",
    "question": "Which traversal of a binary SEARCH tree visits the keys in ascending sorted order?",
    "options": [
      { "id": "a", "text": "Preorder (root, left, right)" },
      { "id": "b", "text": "Inorder (left, root, right)" },
      { "id": "c", "text": "Postorder (left, right, root)" },
      { "id": "d", "text": "Level order (breadth-first)" }
    ],
    "correctOptionId": "b",
    "answer": "Inorder traversal visits left subtree, node, right subtree — for a BST that yields sorted ascending order.",
    "explanation": "The BST invariant (left < root < right) makes inorder equivalent to reading the sorted sequence. A common follow-up: reverse inorder (right, root, left) gives descending order.",
    "keyPoints": ["Inorder respects left < node < right", "Contrasts with preorder's copy/serialize use", "Mentions reverse inorder gives descending"],
    "relatedPractice": "Code Quest → Coding Arena DSA levels."
  },
  {
    "id": "dsa-int-009",
    "subjectId": "dsa",
    "subjectName": "Data Structures & Algorithms",
    "difficulty": "intermediate",
    "type": "mcq",
    "question": "Which data structure naturally powers balanced-bracket checking, and why?",
    "options": [
      { "id": "a", "text": "Queue — brackets arrive left to right" },
      { "id": "b", "text": "Stack — the most recent unmatched bracket must close first" },
      { "id": "c", "text": "HashMap — brackets can be looked up" },
      { "id": "d", "text": "Heap — brackets need ordering" }
    ],
    "correctOptionId": "b",
    "answer": "A stack: push each opening bracket; on a closing bracket pop and check for a match. Nesting means the last opened must be the first closed (LIFO).",
    "explanation": "This is the canonical LIFO problem. Strong candidates also state the O(n) time and O(n) worst-case space, and handle the edge cases: leftover stack at the end, closing with an empty stack.",
    "keyPoints": ["LIFO matches nesting semantics", "Pop-and-compare on closing bracket", "Final stack must be empty", "O(n) time, O(n) worst-case space"],
    "relatedPractice": "Interview Arena → Explain Your Answer."
  },
  {
    "id": "dsa-int-010",
    "subjectId": "dsa",
    "subjectName": "Data Structures & Algorithms",
    "difficulty": "advanced",
    "type": "short-answer",
    "question": "Why is quicksort often preferred over mergesort in practice despite both being O(n log n) on average, and when does quicksort degrade to O(n²)?",
    "answer": "Quicksort sorts in place (O(log n) stack space versus mergesort's O(n) auxiliary array), has excellent cache locality because it scans contiguous regions, and usually wins on constant factors. It degrades to O(n²) when partitions are persistently unbalanced — for example always picking the first element as pivot on already-sorted input. Mitigations: randomized pivots, median-of-three, and introsort switching to heapsort past a depth limit.",
    "explanation": "Interviewers look for the practical trade-offs (memory, locality, worst case) rather than just reciting complexities, and for the standard defensive strategies against adversarial input.",
    "keyPoints": ["In-place vs O(n) extra memory", "Cache locality / constant factors", "Worst case on sorted input with naive pivot", "Randomized or median-of-three pivots fix it", "Stability: mergesort is stable, quicksort is not"],
    "relatedPractice": "Code Quest → Coding Arena: complexity levels."
  }
];
