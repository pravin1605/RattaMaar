const reactQuiz = [
  // =========================================================
  // 1. INTRODUCTION
  // =========================================================

  {
    id: "react-introduction-001",
    subjectId: "react",
    topicId: "introduction",
    topicName: "Introduction",
    noteId: "part_01_introduction",
    question:
      "What is React according to the notes?",
    options: [
      "An open-source JavaScript library for building dynamic and interactive user interfaces",
      "A database management system",
      "A JavaScript testing framework",
      "A backend programming language",
    ],
    correctAnswer: 0,
    explanation:
      "The notes define React as an open-source JavaScript library used for building dynamic and interactive user interfaces.",
    difficulty: "easy",
  },

  {
    id: "react-introduction-002",
    subjectId: "react",
    topicId: "introduction",
    topicName: "Introduction",
    noteId: "part_01_introduction",
    question:
      "Which technology does React use to improve UI update performance?",
    options: [
      "Virtual DOM",
      "SQL",
      "JDBC",
      "Servlet",
    ],
    correctAnswer: 0,
    explanation:
      "The notes explain that React uses the Virtual DOM to improve performance by updating only changed elements.",
    difficulty: "easy",
  },

  {
    id: "react-introduction-003",
    subjectId: "react",
    topicId: "introduction",
    topicName: "Introduction",
    noteId: "part_01_introduction",
    question:
      "In React's unidirectional data flow, data generally flows in which direction?",
    options: [
      "Child → Parent",
      "Parent → Child",
      "Database → Parent only",
      "Child → Child",
    ],
    correctAnswer: 1,
    explanation:
      "The notes describe React's unidirectional data flow as Parent → Child.",
    difficulty: "easy",
  },

  // =========================================================
  // 2. COMPONENTS
  // =========================================================

  {
    id: "react-components-001",
    subjectId: "react",
    topicId: "components",
    topicName: "Components",
    noteId: "part_02_components",
    question:
      "What is the main purpose of a React Fragment?",
    options: [
      "To add an extra div to the DOM",
      "To return multiple elements without adding an extra HTML element to the DOM",
      "To create a database",
      "To manage component state",
    ],
    correctAnswer: 1,
    explanation:
      "The notes explain that a Fragment allows multiple elements to be returned without adding an extra HTML element to the DOM.",
    difficulty: "easy",
  },

  {
    id: "react-components-002",
    subjectId: "react",
    topicId: "components",
    topicName: "Components",
    noteId: "part_02_components",
    question:
      "Which is the preferred short syntax for a React Fragment?",
    options: [
      "<Fragment></Fragment>",
      "<></>",
      "<div></div>",
      "<React></React>",
    ],
    correctAnswer: 1,
    explanation:
      "The notes show <>...</> as the preferred short syntax for React Fragments.",
    difficulty: "easy",
  },

  {
    id: "react-components-003",
    subjectId: "react",
    topicId: "components",
    topicName: "Components",
    noteId: "part_02_components",
    question:
      "What are React Components described as in the notes?",
    options: [
      "Reusable building blocks of a React application",
      "Database tables",
      "CSS files",
      "Browser extensions",
    ],
    correctAnswer: 0,
    explanation:
      "The notes define React Components as reusable building blocks used to create and manage different parts of the UI.",
    difficulty: "easy",
  },

  // =========================================================
  // 3. STATE
  // =========================================================

  {
    id: "react-state-001",
    subjectId: "react",
    topicId: "state",
    topicName: "State",
    noteId: "part_03_state",
    question:
      "What is State in React?",
    options: [
      "A plain JavaScript object used to store component information",
      "A CSS property",
      "A database connection",
      "A routing component",
    ],
    correctAnswer: 0,
    explanation:
      "The notes define state as a plain JavaScript object used by React to store information about a component.",
    difficulty: "easy",
  },

  {
    id: "react-state-002",
    subjectId: "react",
    topicId: "state",
    topicName: "State",
    noteId: "part_03_state",
    question:
      "Which method should be used to update state in a class component?",
    options: [
      "changeState()",
      "updateState()",
      "setState()",
      "modifyState()",
    ],
    correctAnswer: 2,
    explanation:
      "The notes explain that class components should use setState() instead of directly modifying this.state.",
    difficulty: "easy",
  },

  {
    id: "react-state-003",
    subjectId: "react",
    topicId: "state",
    topicName: "State",
    noteId: "part_03_state",
    question:
      "What happens when setState() is called?",
    options: [
      "React detects the change and re-renders the component",
      "The browser closes",
      "The component is deleted",
      "The application automatically logs out",
    ],
    correctAnswer: 0,
    explanation:
      "The notes describe the flow as: React detects the state change → component re-renders → UI updates.",
    difficulty: "easy",
  },

  // =========================================================
  // 4. FUNCTION BASED COMPONENTS
  // =========================================================

  {
    id: "react-fbc-001",
    subjectId: "react",
    topicId: "fbc",
    topicName: "Function Based Components",
    noteId: "part_04_FBC",
    question:
      "What is a Function Based Component?",
    options: [
      "A normal JavaScript function that returns JSX",
      "A database function",
      "A CSS class",
      "An HTML-only component",
    ],
    correctAnswer: 0,
    explanation:
      "The notes define Function Based Components as normal JavaScript functions that return JSX elements.",
    difficulty: "easy",
  },

  {
    id: "react-fbc-002",
    subjectId: "react",
    topicId: "fbc",
    topicName: "Function Based Components",
    noteId: "part_04_FBC",
    question:
      "What naming rule is given for React Function Components?",
    options: [
      "The component name must start with a number",
      "The component name must start with a capital letter",
      "The component name must always be lowercase",
      "The component name must contain an underscore",
    ],
    correctAnswer: 1,
    explanation:
      "The notes state that component names must start with a capital letter because React treats lowercase names as HTML tags.",
    difficulty: "easy",
  },

  {
    id: "react-fbc-003",
    subjectId: "react",
    topicId: "fbc",
    topicName: "Function Based Components",
    noteId: "part_04_FBC",
    question:
      "Which React feature made state and other React features available in Function Components?",
    options: [
      "Hooks",
      "Fragments",
      "Routes",
      "CSS Modules",
    ],
    correctAnswer: 0,
    explanation:
      "The notes explain that Hooks, introduced in React 16.8, changed what Function Components could do.",
    difficulty: "easy",
  },

  // =========================================================
  // 5. HOOKS & useState
  // =========================================================

  {
    id: "react-hooks-001",
    subjectId: "react",
    topicId: "hooks",
    topicName: "Hooks",
    noteId: "part_05_hooks",
    question:
      "When were React Hooks introduced?",
    options: [
      "React 15.0",
      "React 16.8",
      "React 17.0",
      "React 18.0",
    ],
    correctAnswer: 1,
    explanation:
      "The notes state that Hooks were introduced in React 16.8.",
    difficulty: "easy",
  },

  {
    id: "react-hooks-002",
    subjectId: "react",
    topicId: "hooks",
    topicName: "Hooks",
    noteId: "part_05_hooks",
    question:
      "What is the main purpose of React Hooks?",
    options: [
      "Allow Function Components to use React features",
      "Replace HTML with SQL",
      "Create database tables",
      "Compile Java programs",
    ],
    correctAnswer: 0,
    explanation:
      "The notes describe Hooks as built-in React functions that allow Function Components to use features such as state, context and lifecycle-related functionality.",
    difficulty: "easy",
  },

  {
    id: "react-hooks-003",
    subjectId: "react",
    topicId: "hooks",
    topicName: "Hooks",
    noteId: "part_05_hooks",
    question:
      "Which Hook is specifically used in the notes for managing state in Function Components?",
    options: [
      "useEffect",
      "useRef",
      "useState",
      "useMemo",
    ],
    correctAnswer: 2,
    explanation:
      "The notes provide a deep dive into useState and use it for managing state in Function Components.",
    difficulty: "easy",
  },

  // =========================================================
  // 6. PROPS
  // =========================================================

  {
    id: "react-props-001",
    subjectId: "react",
    topicId: "props",
    topicName: "Props",
    noteId: "part_06_props",
    question:
      "What are Props mainly used for in React?",
    options: [
      "Passing data from a parent component to a child component",
      "Creating CSS files",
      "Connecting directly to SQL",
      "Managing browser history",
    ],
    correctAnswer: 0,
    explanation:
      "The notes explain Props using the Parent → Child data flow.",
    difficulty: "easy",
  },

  {
    id: "react-props-002",
    subjectId: "react",
    topicId: "props",
    topicName: "Props",
    noteId: "part_06_props",
    question:
      "What problem is Props Drilling associated with?",
    options: [
      "Passing data through multiple intermediate components",
      "Writing CSS",
      "Creating fragments",
      "Changing the browser URL",
    ],
    correctAnswer: 0,
    explanation:
      "The notes identify Props Drilling as the situation where data has to be passed through intermediate components to reach a deeply nested component.",
    difficulty: "medium",
  },

  // =========================================================
  // 7. CONTEXT API
  // =========================================================

  {
    id: "react-context-001",
    subjectId: "react",
    topicId: "context-api",
    topicName: "Context API",
    noteId: "part_07_contextApi",
    question:
      "What problem does Context API primarily help solve?",
    options: [
      "Props Drilling",
      "CSS syntax errors",
      "HTML validation",
      "Database normalization",
    ],
    correctAnswer: 0,
    explanation:
      "The notes introduce Context API as a solution to the problem of Props Drilling.",
    difficulty: "easy",
  },

  {
    id: "react-context-002",
    subjectId: "react",
    topicId: "context-api",
    topicName: "Context API",
    noteId: "part_07_contextApi",
    question:
      "How many basic steps are described in the notes for using Context API?",
    options: [
      "2",
      "3",
      "4",
      "5",
    ],
    correctAnswer: 1,
    explanation:
      "The Context API notes specifically describe 3 steps to use Context API.",
    difficulty: "easy",
  },

  // =========================================================
  // 8. LIFECYCLE
  // =========================================================

  {
    id: "react-lifecycle-001",
    subjectId: "react",
    topicId: "lifecycle",
    topicName: "Component Lifecycle",
    noteId: "part_08_lifecycle",
    question:
      "Which three phases of the React component lifecycle are described in the notes?",
    options: [
      "Mounting, Updating, Unmounting",
      "Creating, Running, Closing",
      "Starting, Loading, Stopping",
      "Opening, Editing, Saving",
    ],
    correctAnswer: 0,
    explanation:
      "The notes divide the lifecycle into Mounting, Updating and Unmounting phases.",
    difficulty: "easy",
  },

  {
    id: "react-lifecycle-002",
    subjectId: "react",
    topicId: "lifecycle",
    topicName: "Component Lifecycle",
    noteId: "part_08_lifecycle",
    question:
      "Which lifecycle method is associated with cleanup when a component is removed?",
    options: [
      "componentDidMount()",
      "componentDidUpdate()",
      "componentWillUnmount()",
      "render()",
    ],
    correctAnswer: 2,
    explanation:
      "The notes place componentWillUnmount() in the Unmounting phase and demonstrate timer setup and cleanup.",
    difficulty: "medium",
  },

  // =========================================================
  // 9. useEffect
  // =========================================================

  {
    id: "react-useeffect-001",
    subjectId: "react",
    topicId: "use-effect",
    topicName: "useEffect",
    noteId: "part_09_useEffect",
    question:
      "What is useEffect used for according to the notes?",
    options: [
      "Handling side effects in Function Components",
      "Creating CSS classes",
      "Creating React routes only",
      "Replacing JSX",
    ],
    correctAnswer: 0,
    explanation:
      "The notes explain useEffect in the context of side effects and demonstrate uses such as timers and event listeners.",
    difficulty: "easy",
  },

  {
    id: "react-useeffect-002",
    subjectId: "react",
    topicId: "use-effect",
    topicName: "useEffect",
    noteId: "part_09_useEffect",
    question:
      "What does an empty dependency array [] mean in useEffect?",
    options: [
      "The effect runs once only",
      "The effect runs after every render",
      "The effect never runs",
      "The effect runs only when props change",
    ],
    correctAnswer: 0,
    explanation:
      "The notes describe an empty dependency array [] as the case where the effect runs once only.",
    difficulty: "easy",
  },

  {
    id: "react-useeffect-003",
    subjectId: "react",
    topicId: "use-effect",
    topicName: "useEffect",
    noteId: "part_09_useEffect",
    question:
      "What does a dependency array containing a dependency such as [dep] indicate?",
    options: [
      "Run when that dependency changes",
      "Never run the effect",
      "Run only before the component is created",
      "Delete the dependency",
    ],
    correctAnswer: 0,
    explanation:
      "The notes explain that [dep] causes the effect to run when the dependency changes.",
    difficulty: "easy",
  },

  // =========================================================
  // 10. REACT ROUTING
  // =========================================================

  {
    id: "react-routing-001",
    subjectId: "react",
    topicId: "routing",
    topicName: "React Routing",
    noteId: "part_10_react_routing",
    question:
      "What is React Routing used for?",
    options: [
      "Mapping URLs to different React views or components",
      "Creating database tables",
      "Writing Java code",
      "Styling buttons only",
    ],
    correctAnswer: 0,
    explanation:
      "The routing notes explain URL mapping and the use of routing components to display different views.",
    difficulty: "easy",
  },

  {
    id: "react-routing-002",
    subjectId: "react",
    topicId: "routing",
    topicName: "React Routing",
    noteId: "part_10_react_routing",
    question:
      "Which component is described as managing URLs, tracking browser history and preventing page reloads?",
    options: [
      "Route",
      "BrowserRouter",
      "LinkButton",
      "Fragment",
    ],
    correctAnswer: 1,
    explanation:
      "The notes list three responsibilities of BrowserRouter: managing URLs, tracking browser history and preventing page reloads.",
    difficulty: "medium",
  },

  // =========================================================
  // 11. CSS
  // =========================================================

  {
    id: "react-css-001",
    subjectId: "react",
    topicId: "css",
    topicName: "CSS in React",
    noteId: "part_11_css",
    question:
      "How many types of CSS in React are introduced in the notes?",
    options: [
      "2",
      "3",
      "4",
      "5",
    ],
    correctAnswer: 2,
    explanation:
      "The notes introduce four types: Inline CSS, Internal CSS, External CSS and CSS Modules.",
    difficulty: "easy",
  },

  {
    id: "react-css-002",
    subjectId: "react",
    topicId: "css",
    topicName: "CSS in React",
    noteId: "part_11_css",
    question:
      "Which CSS approach is specifically listed as one of the four approaches in the React CSS notes?",
    options: [
      "CSS Modules",
      "SQL CSS",
      "JDBC CSS",
      "Servlet CSS",
    ],
    correctAnswer: 0,
    explanation:
      "CSS Modules are one of the four CSS approaches covered in the notes.",
    difficulty: "easy",
  },

  // =========================================================
  // 12. useCallback
  // =========================================================

  {
    id: "react-usecallback-001",
    subjectId: "react",
    topicId: "use-callback",
    topicName: "useCallback",
    noteId: "part_12_useCallback",
    question:
      "What does useCallback cache according to the notes?",
    options: [
      "A function",
      "An HTML document",
      "A database table",
      "A CSS file",
    ],
    correctAnswer: 0,
    explanation:
      "The notes explain that useCallback caches a function so the same function reference can be reused when dependencies have not changed.",
    difficulty: "easy",
  },

  {
    id: "react-usecallback-002",
    subjectId: "react",
    topicId: "use-callback",
    topicName: "useCallback",
    noteId: "part_12_useCallback",
    question:
      "Which React feature is mentioned as commonly being used together with useCallback?",
    options: [
      "React.memo",
      "React.Fragment",
      "BrowserRouter",
      "useRef",
    ],
    correctAnswer: 0,
    explanation:
      "The notes specifically mention using useCallback together with React.memo to help avoid unnecessary child re-renders.",
    difficulty: "medium",
  },

  // =========================================================
  // 13. EVENT HANDLING
  // =========================================================

  {
    id: "react-events-001",
    subjectId: "react",
    topicId: "event-handling",
    topicName: "Event Handling",
    noteId: "part_13_eventHandling",
    question:
      "What is Event Handling in React?",
    options: [
      "Responding to user actions by executing functions",
      "Creating database schemas",
      "Loading CSS files",
      "Creating HTML documents",
    ],
    correctAnswer: 0,
    explanation:
      "The notes define event handling as responding to user interactions by executing functions when specific events occur.",
    difficulty: "easy",
  },

  {
    id: "react-events-002",
    subjectId: "react",
    topicId: "event-handling",
    topicName: "Event Handling",
    noteId: "part_13_eventHandling",
    question:
      "Which event is used in the notes for handling a button click?",
    options: [
      "onClick",
      "onLoadData",
      "onButton",
      "onPressOnly",
    ],
    correctAnswer: 0,
    explanation:
      "The button-click example uses the React onClick event.",
    difficulty: "easy",
  },

  {
    id: "react-events-003",
    subjectId: "react",
    topicId: "event-handling",
    topicName: "Event Handling",
    noteId: "part_13_eventHandling",
    question:
      "Which method is one of the conditional rendering approaches shown in the notes?",
    options: [
      "Ternary operator",
      "SQL JOIN",
      "For loop only",
      "JDBC connection",
    ],
    correctAnswer: 0,
    explanation:
      "The notes show three conditional rendering approaches: if-else, ternary operator and logical &&.",
    difficulty: "easy",
  },

  // =========================================================
  // 14. FORMS
  // =========================================================

  {
    id: "react-forms-001",
    subjectId: "react",
    topicId: "forms",
    topicName: "Forms",
    noteId: "part_14_form",
    question:
      "What is a Controlled Component?",
    options: [
      "A form element whose value is controlled by React State",
      "A form stored only in HTML",
      "A CSS-controlled component",
      "A component controlled by SQL",
    ],
    correctAnswer: 0,
    explanation:
      "The notes define a Controlled Component as a form element where React State becomes the single source of truth.",
    difficulty: "easy",
  },

  {
    id: "react-forms-002",
    subjectId: "react",
    topicId: "forms",
    topicName: "Forms",
    noteId: "part_14_form",
    question:
      "Why is e.preventDefault() used in the form example?",
    options: [
      "To stop the default page reload during form submission",
      "To clear React state",
      "To create a new route",
      "To focus an input",
    ],
    correctAnswer: 0,
    explanation:
      "The notes explain that normally form submission can reload the page, and e.preventDefault() stops that default behavior.",
    difficulty: "easy",
  },

  {
    id: "react-forms-003",
    subjectId: "react",
    topicId: "forms",
    topicName: "Forms",
    noteId: "part_14_form",
    question:
      "Where is the value stored in an Uncontrolled Component according to the notes?",
    options: [
      "In the DOM",
      "Only in SQL",
      "Only in CSS",
      "Inside BrowserRouter",
    ],
    correctAnswer: 0,
    explanation:
      "The notes contrast controlled and uncontrolled components by stating that uncontrolled component values are stored in the DOM.",
    difficulty: "medium",
  },

  // =========================================================
  // 15. useRef
  // =========================================================

  {
    id: "react-useref-001",
    subjectId: "react",
    topicId: "use-ref",
    topicName: "useRef",
    noteId: "part_15_userRafe",
    question:
      "What is one main purpose of useRef?",
    options: [
      "Directly access DOM elements and store mutable values without causing re-renders",
      "Create routes",
      "Replace all CSS",
      "Create database tables",
    ],
    correctAnswer: 0,
    explanation:
      "The notes define useRef as a Hook for directly accessing DOM elements and storing mutable values without triggering re-renders.",
    difficulty: "easy",
  },

  {
    id: "react-useref-002",
    subjectId: "react",
    topicId: "use-ref",
    topicName: "useRef",
    noteId: "part_15_userRafe",
    question:
      "Which property is used to access the current value of a useRef reference?",
    options: [
      "ref.value",
      "ref.current",
      "ref.data",
      "ref.state",
    ],
    correctAnswer: 1,
    explanation:
      "The notes show the internal reference object using a current property, accessed as inputRef.current.",
    difficulty: "easy",
  },

  {
    id: "react-useref-003",
    subjectId: "react",
    topicId: "use-ref",
    topicName: "useRef",
    noteId: "part_15_userRafe",
    question:
      "Which Hook is used in the notes to focus an input field without using state?",
    options: [
      "useMemo",
      "useEffect",
      "useRef",
      "useCallback",
    ],
    correctAnswer: 2,
    explanation:
      "The useRef notes demonstrate inputRef.current.focus() for moving the cursor into an input field.",
    difficulty: "easy",
  },

  // =========================================================
  // 16. useMemo
  // =========================================================

  {
    id: "react-usememo-001",
    subjectId: "react",
    topicId: "use-memo",
    topicName: "useMemo",
    noteId: "react_16_userMemo",
    question:
      "What does useMemo cache according to the notes?",
    options: [
      "The result of a computation",
      "A DOM element permanently",
      "A browser URL",
      "A CSS stylesheet",
    ],
    correctAnswer: 0,
    explanation:
      "The notes define useMemo as a Hook that memorizes the result of a computation and recalculates it only when dependencies change.",
    difficulty: "easy",
  },

  {
    id: "react-usememo-002",
    subjectId: "react",
    topicId: "use-memo",
    topicName: "useMemo",
    noteId: "react_16_userMemo",
    question:
      "Why is useMemo useful for expensive calculations?",
    options: [
      "It can prevent unnecessary recalculations when dependencies have not changed",
      "It automatically creates database tables",
      "It removes all component re-renders",
      "It replaces useState completely",
    ],
    correctAnswer: 0,
    explanation:
      "The notes explain that useMemo stores a calculated result and reuses it when dependencies have not changed.",
    difficulty: "medium",
  },

  {
    id: "react-usememo-003",
    subjectId: "react",
    topicId: "use-memo",
    topicName: "useMemo",
    noteId: "react_16_userMemo",
    question:
      "When does useMemo recalculate its value?",
    options: [
      "When its dependencies change",
      "Only when the browser is closed",
      "Never",
      "Only after a page reload",
    ],
    correctAnswer: 0,
    explanation:
      "The notes show the useMemo flow as: dependencies changed → recalculate and store the result; otherwise use the previous cached result.",
    difficulty: "easy",
  },
];

export default reactQuiz;