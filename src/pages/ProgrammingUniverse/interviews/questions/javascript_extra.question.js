export default [
  {
    "id": "js-int-008",
    "subjectId": "javascript",
    "subjectName": "JavaScript",
    "difficulty": "intermediate",
    "type": "mcq",
    "question": "What happens when this code runs?\nlet city = 'Paris';\nconsole.log(country);\nlet country = 'France';",
    "options": [
      {
        "id": "a",
        "text": "Logs undefined, because let declarations are hoisted and initialized like var"
      },
      {
        "id": "b",
        "text": "Throws ReferenceError: Cannot access 'country' before initialization"
      },
      {
        "id": "c",
        "text": "Logs 'France', because declarations are processed before any code runs"
      },
      {
        "id": "d",
        "text": "Fails at parse time before any line executes"
      }
    ],
    "correctOptionId": "b",
    "answer": "A ReferenceError is thrown because country is in the temporal dead zone until its let declaration is executed.",
    "explanation": "let and const bindings are hoisted to the top of their block but remain uninitialized in the temporal dead zone; any access before the declaration line is a runtime ReferenceError. With var the same code would log undefined instead, which is exactly the difference interviewers probe."
  },
  {
    "id": "js-int-009",
    "subjectId": "javascript",
    "subjectName": "JavaScript",
    "difficulty": "intermediate",
    "type": "mcq",
    "question": "This loop schedules three timers. What is logged when the timer callbacks fire?\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}",
    "options": [
      {
        "id": "a",
        "text": "0 1 2, because each callback captures its own value of i"
      },
      {
        "id": "b",
        "text": "3 3 3, because all callbacks close over the single var binding whose value is 3 when they run"
      },
      {
        "id": "c",
        "text": "1 2 3, because setTimeout shifts indices by one"
      },
      {
        "id": "d",
        "text": "Nothing, because i is out of scope inside the callback"
      }
    ],
    "correctOptionId": "b",
    "answer": "It logs 3 three times: the three callbacks share one function-scoped i, and the loop finishes before any timer callback executes.",
    "explanation": "var creates a single binding for the whole enclosing function, and closures capture bindings, not snapshots. Changing let i gives 0 1 2 because let creates a fresh binding per iteration; wrapping the callback in an IIFE that passes i is the classic pre-ES6 fix."
  },
  {
    "id": "js-int-010",
    "subjectId": "javascript",
    "subjectName": "JavaScript",
    "difficulty": "advanced",
    "type": "mcq",
    "question": "Which of these expressions evaluates to true?",
    "options": [
      {
        "id": "a",
        "text": "null === undefined"
      },
      {
        "id": "b",
        "text": "NaN == NaN"
      },
      {
        "id": "c",
        "text": "0 == ''"
      },
      {
        "id": "d",
        "text": "'1' + 1 == 2"
      }
    ],
    "correctOptionId": "c",
    "answer": "0 == '' is true: loose equality coerces both operands to numbers, and Number('') is 0.",
    "explanation": "== converts types before comparing, so 0 and '' both become 0. null === undefined is false because strict equality never converts types, NaN == NaN is false by IEEE 754 semantics (use Number.isNaN), and '1' + 1 concatenates to '11', so '11' == 2 is false. The takeaway: prefer === and reserve == only for intentional null-or-undefined checks."
  },
  {
    "id": "js-int-011",
    "subjectId": "javascript",
    "subjectName": "JavaScript",
    "difficulty": "advanced",
    "type": "mcq",
    "question": "What does this log?\nconst team = {\n  name: 'Core',\n  members: ['Ava', 'Ben'],\n  announce() {\n    return this.members.map((m) => m + ' - ' + this.name);\n  }\n};\nconsole.log(team.announce()[0]);",
    "options": [
      {
        "id": "a",
        "text": "'Ava - Core'"
      },
      {
        "id": "b",
        "text": "'Ava - undefined', because this is lost inside map"
      },
      {
        "id": "c",
        "text": "TypeError, because this is undefined in the callback"
      },
      {
        "id": "d",
        "text": "'Core - Ava'"
      }
    ],
    "correctOptionId": "a",
    "answer": "It logs 'Ava - Core' because the arrow function takes this from its enclosing announce() call, where this is team.",
    "explanation": "Arrow functions have no own this; they use the this of the lexical scope where they were defined. Here that scope is announce, invoked as team.announce(), so this is team. A regular function passed to map would default this to undefined in strict mode or modules and throw. Interviewers also expect the caveat: an arrow as an object method itself would not bind the object."
  },
  {
    "id": "js-int-012",
    "subjectId": "javascript",
    "subjectName": "JavaScript",
    "difficulty": "intermediate",
    "type": "short-answer",
    "question": "How does JavaScript resolve a property access like obj.name when the property is not on the object itself? Explain the prototype chain.",
    "answer": "When you read obj.name, the engine first checks for an own property on obj. If absent, it follows the object's internal [[Prototype]] link, readable with Object.getPrototypeOf(obj), and checks that object, continuing up the chain until it finds the property or reaches null, at which point the expression evaluates to undefined rather than throwing. Constructor-created objects link to the constructor's prototype object, for example new Person() inherits from Person.prototype, which itself inherits from Object.prototype, the usual end of the chain before null. The lookup happens at access time, so later additions to a prototype are visible to existing objects, and this is how methods like toString are shared instead of copied per instance. To distinguish own from inherited properties I would use Object.hasOwn(obj, 'name') or hasOwnProperty, and in for-in loops filter with them. A strong answer also notes the difference between the prototype linked on an instance and the .prototype property held by functions.",
    "explanation": "Interviewers use this to check whether you understand inheritance in a prototype language rather than class terminology. Mentioning Object.prototype as the near-terminal link, dynamic lookup, and own-versus-inherited checks demonstrates real depth.",
    "keyPoints": [
      "Search order: own property, then [[Prototype]] links upward, ending at null with undefined result",
      "new X() objects link to X.prototype, and Object.prototype sits near the end of the chain",
      "Lookup is performed at access time, so prototype changes are seen by existing objects",
      "Object.hasOwn or hasOwnProperty separates own from inherited properties"
    ]
  },
  {
    "id": "js-int-013",
    "subjectId": "javascript",
    "subjectName": "JavaScript",
    "difficulty": "advanced",
    "type": "short-answer",
    "question": "Compare async/await with raw Promises. Is async/await just syntax sugar, and where does that simplification break down?",
    "answer": "async/await is built on Promises, not a replacement for them: an async function always returns a Promise, and await suspends only that function, handing control back to the event loop, so nothing blocks the thread. Where they shine is sequential, dependent work, for example fetching a user then their orders, because errors surface as ordinary exceptions and can be handled with try/catch instead of .then/.catch chains, which also makes stack traces and debugging friendlier. The simplification breaks down in three places candidates should name. First, awaiting inside a loop serializes requests: to run independent tasks concurrently you must start the Promises first and then combine with Promise.all or allSettled. Second, async/await still needs raw Promise APIs for combinators, timeouts, or bridging callback-based code with new Promise(...). Third, unhandled rejections from a floating await call behave like unhandled .catch omissions, so fire-and-forget async calls still need error handling. In interviews I would say: await reads like synchronous code but keeps asynchronous semantics, and the main trap is accidentally removing concurrency.",
    "explanation": "Interviewers want the precise relationship: async/await desugars onto Promise machinery, so knowledge of one presumes the other. The loop-serialization trap and the need for combinators are the practical signals that a candidate has actually used both.",
    "keyPoints": [
      "async functions always return a Promise; await yields control instead of blocking the thread",
      "try/catch works for rejected Promises, improving readability for dependent sequential steps",
      "await in a loop serializes work; use Promise.all with already-started promises for concurrency",
      "Raw Promise APIs are still needed for combinators, timeouts, and wrapping callback-style code"
    ]
  },
  {
    "id": "js-int-014",
    "subjectId": "javascript",
    "subjectName": "JavaScript",
    "difficulty": "intermediate",
    "type": "mcq",
    "question": "A page has <ul id=\"list\"> into which new <li><button data-action=\"delete\" data-id=\"7\">...</button></li> items are added dynamically. Which approach handles the delete button for current and future items with the fewest listeners?",
    "options": [
      {
        "id": "a",
        "text": "Attach a separate click listener to every button each time a new item is added"
      },
      {
        "id": "b",
        "text": "Attach one click listener to the <ul> and inside it use event.target.closest('button[data-action=\"delete\"]') to identify the clicked button"
      },
      {
        "id": "c",
        "text": "Poll document.querySelectorAll('button') on a timer and rebind all listeners"
      },
      {
        "id": "d",
        "text": "Listen for keydown on the <ul>, because mouse events do not bubble"
      }
    ],
    "correctOptionId": "b",
    "answer": "Event delegation: a single listener on the common ancestor catches bubbled click events, and closest() finds the intended descendant target.",
    "explanation": "Click events bubble from the target up through ancestors, so one listener on the list works for buttons that did not exist when the listener was attached, avoids leaking listeners on removed items, and reads the item id from the dataset. Option a works but multiplies listeners; mouse events do bubble, so the premise of d is wrong."
  },
  {
    "id": "js-int-015",
    "subjectId": "javascript",
    "subjectName": "JavaScript",
    "difficulty": "beginner",
    "type": "mcq",
    "question": "What does this log?\nconst data = [1, 2, 3];\nconst mapped = data.map((n) => n + 1);\nconst total = mapped.reduce((sum, n) => sum + n, 0);\nconsole.log(mapped, total);",
    "options": [
      {
        "id": "a",
        "text": "[ 2, 3, 4 ] 6"
      },
      {
        "id": "b",
        "text": "[ 1, 2, 3 ] 6"
      },
      {
        "id": "c",
        "text": "undefined 6"
      },
      {
        "id": "d",
        "text": "[ 2, 3, 4 ] undefined"
      }
    ],
    "correctOptionId": "a",
    "answer": "It logs [ 2, 3, 4 ] 6: map returns a new transformed array and reduce folds it into the sum 2+3+4.",
    "explanation": "map produces a brand-new array and leaves data untouched, reduce accumulates a single value from the array starting at the provided initial value 0, and forEach would return undefined because it exists only for side effects. Interviewers often follow up by asking which method mutates the original (none of the three here)."
  },
  {
    "id": "js-int-016",
    "subjectId": "javascript",
    "subjectName": "JavaScript",
    "difficulty": "beginner",
    "type": "short-answer",
    "question": "Explain hoisting order in JavaScript and predict the output of this snippet:\ngreet();\nconsole.log(message);\nfunction greet() { console.log('hi'); }\nvar message = 'hello';",
    "answer": "It prints hi and then undefined. Before any statement runs, the engine processes declarations in its scope: function declarations are hoisted fully, name and callable body together, so greet() works above its definition; var declarations are hoisted but initialized to undefined, so message logs undefined and only receives 'hello' when its assignment line executes; let and const are also hoisted but sit in the temporal dead zone until their declaration runs, so accessing them early throws a ReferenceError instead. Hoisting is a consequence of declarations being processed before code execution, not of statements physically moving, and it only applies to declarations, never to assignments or function expressions like const f = function () {}, whose variable follows let/const rules. I would add the practical advice: modern style avoids relying on hoisting and declares things before use.",
    "explanation": "This classic question separates candidates who memorized a slogan from those who know the three different behaviors: full hoisting for function declarations, undefined-initialized hoisting for var, and TDZ for let/const. Naming classes as TDZ-backed like let is another plus.",
    "keyPoints": [
      "Function declarations are hoisted with their bodies, so they can be called before their source line",
      "var is hoisted but initialized to undefined; the value arrives only when the assignment runs",
      "let/const (and class) are hoisted into a temporal dead zone; early access throws ReferenceError",
      "Output prediction: hi, then undefined"
    ]
  },
  {
    "id": "js-int-017",
    "subjectId": "javascript",
    "subjectName": "JavaScript",
    "difficulty": "intermediate",
    "type": "short-answer",
    "question": "What is debouncing? Explain the concept, how you would implement it, and when not to use it.",
    "answer": "Debouncing collapses a burst of rapid events into a single handled call: each new event resets a timer, and the real work runs only after a quiet period has passed with no further events. A minimal implementation keeps a timer id in a closure, and the wrapper clears the pending timeout on every call before scheduling fn again with setTimeout, so for a search box typing 'javascript' fires one request once the user pauses rather than ten. The key comparison is throttling, which guarantees execution at most once per fixed interval regardless of bursts: debouncing suits events whose intermediate states are meaningless, such as search-as-you-type, resize, or autosave, while throttling suits streams that must progress steadily, such as scroll position tracking or rate-limiting button presses. Variants worth naming are leading-edge execution for immediate response and a max-wait cap so an endless event stream never starves the handler permanently. When not to use it: never debounce events that carry data the user expects to act on, like form submit clicks or keystrokes feeding a game, because delaying or dropping them breaks the interaction.",
    "explanation": "Interviewers ask this to see closure and timer fluency plus judgment about event semantics. A strong answer states the clearTimeout mechanism, contrasts debounce with throttle precisely, and picks examples by whether intermediate events matter.",
    "keyPoints": [
      "Definition: reset a timer on each event; run the work only after a quiet period",
      "Implementation: closure holds a timeout id, clearTimeout on each call, setTimeout to schedule",
      "Contrast with throttle: throttle fires at a steady rate, debounce fires after the burst stops",
      "Right use cases (search input, resize) and wrong ones (submit clicks, any event users act on)"
    ]
  }
];
