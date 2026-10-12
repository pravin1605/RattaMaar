export default [
  {
    "id": "js-int-001",
    "subjectId": "javascript",
    "subjectName": "JavaScript",
    "difficulty": "beginner",
    "type": "mcq",
    "question": "Which JavaScript value represents an explicitly assigned absence of a value?",
    "options": [
      {
        "id": "a",
        "text": "undefined only"
      },
      {
        "id": "b",
        "text": "null"
      },
      {
        "id": "c",
        "text": "NaN"
      },
      {
        "id": "d",
        "text": "false"
      }
    ],
    "correctOptionId": "b",
    "answer": "null is commonly used to represent an intentional absence of an object or value.",
    "explanation": "undefined often means a value has not been assigned or a property does not exist. Their exact behavior differs in comparisons and type checks."
  },
  {
    "id": "js-int-002",
    "subjectId": "javascript",
    "subjectName": "JavaScript",
    "difficulty": "beginner",
    "type": "mcq",
    "question": "What does === check in JavaScript?",
    "options": [
      {
        "id": "a",
        "text": "Equality after automatic type coercion"
      },
      {
        "id": "b",
        "text": "Strict equality without type coercion"
      },
      {
        "id": "c",
        "text": "Only object identity for every value"
      },
      {
        "id": "d",
        "text": "Whether two variables have the same name"
      }
    ],
    "correctOptionId": "b",
    "answer": "Strict equality compares values without converting different types first.",
    "explanation": "For objects and arrays, equality checks whether both references point to the same object, not whether their contents are structurally identical."
  },
  {
    "id": "js-int-003",
    "subjectId": "javascript",
    "subjectName": "JavaScript",
    "difficulty": "intermediate",
    "type": "mcq",
    "question": "What is a closure?",
    "options": [
      {
        "id": "a",
        "text": "A function bundled with access to its lexical environment"
      },
      {
        "id": "b",
        "text": "A loop that never ends"
      },
      {
        "id": "c",
        "text": "A CSS selector"
      },
      {
        "id": "d",
        "text": "A promise that has rejected"
      }
    ],
    "correctOptionId": "a",
    "answer": "A closure lets a function access variables from the lexical scope in which it was created, even when called elsewhere later.",
    "explanation": "Closures are useful for callbacks, encapsulated state, and function factories. The captured bindings remain accessible according to JavaScript's lexical scoping rules."
  },
  {
    "id": "js-int-004",
    "subjectId": "javascript",
    "subjectName": "JavaScript",
    "difficulty": "intermediate",
    "type": "mcq",
    "question": "What does Array.prototype.map() return?",
    "options": [
      {
        "id": "a",
        "text": "The first matching element"
      },
      {
        "id": "b",
        "text": "A new array containing callback results for each element"
      },
      {
        "id": "c",
        "text": "Always a boolean"
      },
      {
        "id": "d",
        "text": "The original array sorted in place"
      }
    ],
    "correctOptionId": "b",
    "answer": "map creates a new array from the callback result for each visited element.",
    "explanation": "Use filter to keep elements meeting a condition, find to get the first match, and forEach when iterating for side effects without needing a mapped result."
  },
  {
    "id": "js-int-005",
    "subjectId": "javascript",
    "subjectName": "JavaScript",
    "difficulty": "advanced",
    "type": "mcq",
    "question": "What is the main purpose of Promise.all()?",
    "options": [
      {
        "id": "a",
        "text": "To wait for all input promises to fulfill, rejecting if any rejects"
      },
      {
        "id": "b",
        "text": "To run promises strictly one after another"
      },
      {
        "id": "c",
        "text": "To ignore all rejected promises"
      },
      {
        "id": "d",
        "text": "To convert every value to a string"
      }
    ],
    "correctOptionId": "a",
    "answer": "Promise.all fulfills with an array of results when all inputs fulfill and rejects when any input rejects.",
    "explanation": "It does not itself start sequential execution. Use sequential await in a loop when each task depends on the previous task's completion."
  },
  {
    "id": "js-int-006",
    "subjectId": "javascript",
    "subjectName": "JavaScript",
    "difficulty": "advanced",
    "type": "mcq",
    "question": "What is event delegation in the DOM?",
    "options": [
      {
        "id": "a",
        "text": "Attaching one event listener to a common ancestor to handle events from descendants"
      },
      {
        "id": "b",
        "text": "Creating one HTML file per button"
      },
      {
        "id": "c",
        "text": "Preventing all bubbling"
      },
      {
        "id": "d",
        "text": "Running events on a server only"
      }
    ],
    "correctOptionId": "a",
    "answer": "Event delegation uses event bubbling so a parent listener can handle events from matching child elements.",
    "explanation": "It can reduce listener count for large or dynamically changing lists. The handler should inspect event.target or use closest() carefully to identify the intended descendant."
  },
  {
    "id": "js-int-007",
    "subjectId": "javascript",
    "subjectName": "JavaScript",
    "difficulty": "intermediate",
    "type": "short-answer",
    "question": "Explain the JavaScript event loop and how microtasks differ from timer callbacks.",
    "answer": "JavaScript runs synchronous code on its call stack. Asynchronous APIs schedule callbacks. After the current stack finishes, the event loop processes queued work. Promise reactions are microtasks and are generally drained before the next timer/task callback, such as a setTimeout callback, runs.",
    "explanation": "A good answer distinguishes the call stack, task queue, and microtask queue. Exact host behavior includes browser or Node.js details, so avoid claiming all asynchronous work runs in parallel on the JavaScript thread.",
    "keyPoints": [
      "Explains event loop with call stack, task queue, microtask queue",
      "Distinguishes macrotasks (setTimeout) from microtasks (Promise.then)",
      "Predicts correct output order using those rules",
      "Mentions non-blocking I/O being delegated to browser/node APIs"
    ]
  }
];
