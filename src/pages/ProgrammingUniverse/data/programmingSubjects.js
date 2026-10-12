/** Programming Universe subject catalogue. Intentionally independent from NotesWeb note titles. */
const programmingSubjects = [
  { id: "java-fundamentals", name: "Java", icon: "☕", description: "Practice Java syntax, OOP concepts, loops, debugging and interview questions.", category: "Programming Language", status: "active", chapterIds: ["code-quest", "pattern-lab"] },
  { id: "python", name: "Python", icon: "🐍", description: "Build confidence with Python syntax, collections, functions and problem solving.", category: "Programming Language", status: "planned", chapterIds: ["code-quest"] },
  { id: "c-language", name: "C Programming", icon: "C", description: "Understand procedural programming, pointers, arrays and memory fundamentals.", category: "Programming Language", status: "planned", chapterIds: ["code-quest"] },
  { id: "cpp", name: "C++", icon: "C++", description: "Practice object-oriented C++, STL and algorithmic problem solving.", category: "Programming Language", status: "planned", chapterIds: ["code-quest"] },
  { id: "javascript", name: "JavaScript", icon: "JS", description: "Learn the language of the web through concepts, output puzzles and interview practice.", category: "Programming Language", status: "interview-ready", chapterIds: ["code-quest"] },
  { id: "sql", name: "SQL", icon: "▤", description: "Practice queries, joins, grouping, subqueries and database interview questions.", category: "Database", status: "interview-ready", chapterIds: ["code-quest"] },
  { id: "dsa", name: "Data Structures & Algorithms", icon: "⌘", description: "Strengthen arrays, linked lists, stacks, queues, trees, sorting and complexity analysis.", category: "Computer Science", status: "interview-ready", chapterIds: ["code-quest"] },
  { id: "dbms", name: "DBMS", icon: "▥", description: "Explore keys, normalization, transactions, indexing and relational database design.", category: "Computer Science", status: "interview-ready", chapterIds: ["code-quest"] },
  { id: "oop", name: "OOP Concepts", icon: "◍", description: "Objects, classes, inheritance, polymorphism, encapsulation and design intuition.", category: "Computer Science", status: "interview-ready", chapterIds: ["code-quest"] },
  { id: "hr", name: "HR & Project Discussion", icon: "☺", description: "Prepare honest, structured answers about your projects, strengths and teamwork.", category: "Soft Skills", status: "interview-ready", chapterIds: [] },
  { id: "operating-systems", name: "Operating Systems", icon: "▣", description: "Prepare for processes, threads, scheduling, memory and synchronization questions.", category: "Computer Science", status: "planned", chapterIds: ["code-quest"] },
  { id: "computer-networks", name: "Computer Networks", icon: "◎", description: "Study networking fundamentals, HTTP, TCP/IP, DNS and common interview concepts.", category: "Computer Science", status: "planned", chapterIds: ["code-quest"] },
];
export default programmingSubjects;
