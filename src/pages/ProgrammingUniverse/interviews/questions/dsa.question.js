export default [
  {
    "id": "dsa-int-001",
    "subjectId": "dsa",
    "subjectName": "Data Structures & Algorithms",
    "difficulty": "beginner",
    "type": "mcq",
    "question": "What is the time complexity of accessing an array element by index?",
    "options": [
      {
        "id": "a",
        "text": "O(1)"
      },
      {
        "id": "b",
        "text": "O(log n)"
      },
      {
        "id": "c",
        "text": "O(n)"
      },
      {
        "id": "d",
        "text": "O(n²)"
      }
    ],
    "correctOptionId": "a",
    "answer": "Array index access is O(1) because the element address can be calculated directly.",
    "explanation": "This describes access by index, not searching for a value. A linear search through an unsorted array is O(n) in the worst case."
  },
  {
    "id": "dsa-int-002",
    "subjectId": "dsa",
    "subjectName": "Data Structures & Algorithms",
    "difficulty": "beginner",
    "type": "mcq",
    "question": "Which data structure follows Last In, First Out (LIFO)?",
    "options": [
      {
        "id": "a",
        "text": "Queue"
      },
      {
        "id": "b",
        "text": "Stack"
      },
      {
        "id": "c",
        "text": "Graph"
      },
      {
        "id": "d",
        "text": "Priority queue only"
      }
    ],
    "correctOptionId": "b",
    "answer": "A stack removes the most recently added item first.",
    "explanation": "Push adds an item and pop removes the top item. A standard queue instead follows FIFO: First In, First Out."
  },
  {
    "id": "dsa-int-003",
    "subjectId": "dsa",
    "subjectName": "Data Structures & Algorithms",
    "difficulty": "intermediate",
    "type": "mcq",
    "question": "What condition is required for binary search to work correctly on a conventional array?",
    "options": [
      {
        "id": "a",
        "text": "The array must contain only positive integers"
      },
      {
        "id": "b",
        "text": "The array must be sorted according to the search order"
      },
      {
        "id": "c",
        "text": "The array must have an even number of elements"
      },
      {
        "id": "d",
        "text": "Every element must be unique"
      }
    ],
    "correctOptionId": "b",
    "answer": "Binary search relies on sorted order to discard half of the remaining search range at each step.",
    "explanation": "Duplicates are allowed, but finding the first or last occurrence requires additional boundary logic. Its search time is O(log n)."
  },
  {
    "id": "dsa-int-004",
    "subjectId": "dsa",
    "subjectName": "Data Structures & Algorithms",
    "difficulty": "intermediate",
    "type": "mcq",
    "question": "What is the average time complexity of inserting an item at the end of a dynamic array when capacity is available?",
    "options": [
      {
        "id": "a",
        "text": "O(1)"
      },
      {
        "id": "b",
        "text": "O(log n)"
      },
      {
        "id": "c",
        "text": "O(n)"
      },
      {
        "id": "d",
        "text": "O(n log n)"
      }
    ],
    "correctOptionId": "a",
    "answer": "When spare capacity exists, appending writes into the next free position in O(1) time.",
    "explanation": "A resize can take O(n), but geometric capacity growth makes append amortized O(1) across a sequence of operations."
  },
  {
    "id": "dsa-int-005",
    "subjectId": "dsa",
    "subjectName": "Data Structures & Algorithms",
    "difficulty": "advanced",
    "type": "mcq",
    "question": "Which statement best describes a stable sorting algorithm?",
    "options": [
      {
        "id": "a",
        "text": "It always runs in O(n)"
      },
      {
        "id": "b",
        "text": "It preserves the relative order of equal-key elements"
      },
      {
        "id": "c",
        "text": "It never uses additional memory"
      },
      {
        "id": "d",
        "text": "It works only on linked lists"
      }
    ],
    "correctOptionId": "b",
    "answer": "Stability preserves the original relative order of records whose sort keys are equal.",
    "explanation": "Stability is useful when sorting by multiple keys in successive passes. It is independent of whether an algorithm is in-place or linear-time."
  },
  {
    "id": "dsa-int-006",
    "subjectId": "dsa",
    "subjectName": "Data Structures & Algorithms",
    "difficulty": "advanced",
    "type": "mcq",
    "question": "What is the worst-case time complexity of merge sort on an array?",
    "options": [
      {
        "id": "a",
        "text": "O(1)"
      },
      {
        "id": "b",
        "text": "O(log n)"
      },
      {
        "id": "c",
        "text": "O(n log n)"
      },
      {
        "id": "d",
        "text": "O(n² log n)"
      }
    ],
    "correctOptionId": "c",
    "answer": "Merge sort divides the array into logarithmically many levels and processes O(n) total elements per level.",
    "explanation": "Its time complexity is O(n log n) in the best, average, and worst cases. Typical array implementations require O(n) auxiliary space."
  },
  {
    "id": "dsa-int-007",
    "subjectId": "dsa",
    "subjectName": "Data Structures & Algorithms",
    "difficulty": "intermediate",
    "type": "short-answer",
    "question": "How would you explain Big O notation, and what is the difference between O(n) and O(log n)?",
    "answer": "Big O describes how an algorithm's resource use grows as input size grows, commonly time or space. O(n) grows proportionally with the input size. O(log n) grows logarithmically; each step often reduces the remaining problem by a constant factor, as binary search does on sorted data.",
    "explanation": "Give an example and state assumptions. Big O focuses on growth rate and usually suppresses constants and lower-order terms; it is not a direct measurement of seconds.",
    "keyPoints": [
      "States the data structure choice explicitly",
      "Justifies choice with the operations needed and their complexity",
      "Mentions time and/or space trade-offs",
      "Notes an alternative and why it was rejected"
    ]
  }
];
