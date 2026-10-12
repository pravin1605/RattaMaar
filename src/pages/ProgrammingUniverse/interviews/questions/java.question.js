export default [
  {
    "id": "java-int-001",
    "subjectId": "java-fundamentals",
    "subjectName": "Java",
    "difficulty": "beginner",
    "type": "mcq",
    "question": "What is the main purpose of the JVM?",
    "options": [
      {
        "id": "a",
        "text": "To compile Java source directly into HTML"
      },
      {
        "id": "b",
        "text": "To execute Java bytecode"
      },
      {
        "id": "c",
        "text": "To store Java classes in a database"
      },
      {
        "id": "d",
        "text": "To replace the Java compiler"
      }
    ],
    "correctOptionId": "b",
    "answer": "The Java Virtual Machine executes Java bytecode and provides the runtime environment for Java programs.",
    "explanation": "javac compiles .java source files into bytecode (.class files). The JVM loads, verifies, and executes that bytecode, allowing the same compiled code to run on compatible platforms."
  },
  {
    "id": "java-int-002",
    "subjectId": "java-fundamentals",
    "subjectName": "Java",
    "difficulty": "beginner",
    "type": "mcq",
    "question": "Which statement best describes method overloading in Java?",
    "options": [
      {
        "id": "a",
        "text": "A child class replaces a parent method with the same signature"
      },
      {
        "id": "b",
        "text": "Multiple methods share a name but have different parameter lists"
      },
      {
        "id": "c",
        "text": "A method can be called only once"
      },
      {
        "id": "d",
        "text": "A method is converted into a constructor"
      }
    ],
    "correctOptionId": "b",
    "answer": "Method overloading means using the same method name with different parameter lists in the same class or inheritance context.",
    "explanation": "Overloading is resolved at compile time. The parameter number, types, or order must differ; changing only the return type is not enough."
  },
  {
    "id": "java-int-003",
    "subjectId": "java-fundamentals",
    "subjectName": "Java",
    "difficulty": "intermediate",
    "type": "mcq",
    "question": "Why should equals() and hashCode() usually be overridden together for a value-based class?",
    "options": [
      {
        "id": "a",
        "text": "Because Java refuses to compile otherwise"
      },
      {
        "id": "b",
        "text": "Because equal objects must produce the same hash code for hash-based collections"
      },
      {
        "id": "c",
        "text": "Because hashCode() compares every field automatically"
      },
      {
        "id": "d",
        "text": "Because equals() is only available in interfaces"
      }
    ],
    "correctOptionId": "b",
    "answer": "If two objects are equal according to equals(), they must return the same hash code.",
    "explanation": "HashMap and HashSet use hash codes to locate buckets and equals() to distinguish objects within a bucket. Violating the contract can make lookups and duplicate detection unreliable."
  },
  {
    "id": "java-int-004",
    "subjectId": "java-fundamentals",
    "subjectName": "Java",
    "difficulty": "intermediate",
    "type": "mcq",
    "question": "What is the key difference between an interface and an abstract class in modern Java?",
    "options": [
      {
        "id": "a",
        "text": "Interfaces cannot declare methods"
      },
      {
        "id": "b",
        "text": "A class can extend multiple classes but implement one interface"
      },
      {
        "id": "c",
        "text": "A class can implement multiple interfaces but extend only one class"
      },
      {
        "id": "d",
        "text": "Abstract classes cannot contain fields"
      }
    ],
    "correctOptionId": "c",
    "answer": "Java supports single class inheritance but allows a class to implement multiple interfaces.",
    "explanation": "Abstract classes can hold instance state and constructors. Interfaces can declare abstract, default, static, and private methods, but they do not replace class inheritance."
  },
  {
    "id": "java-int-005",
    "subjectId": "java-fundamentals",
    "subjectName": "Java",
    "difficulty": "advanced",
    "type": "mcq",
    "question": "What does try-with-resources guarantee when used with an AutoCloseable resource?",
    "options": [
      {
        "id": "a",
        "text": "The resource closes automatically when the try statement exits"
      },
      {
        "id": "b",
        "text": "Every exception is ignored"
      },
      {
        "id": "c",
        "text": "The resource stays open for the entire JVM lifetime"
      },
      {
        "id": "d",
        "text": "The resource is always closed before the try block begins"
      }
    ],
    "correctOptionId": "a",
    "answer": "Resources declared in try-with-resources are closed automatically after the statement completes.",
    "explanation": "The resource must implement AutoCloseable (Closeable extends it). Java closes resources even when the block exits because of an exception, using reverse declaration order for multiple resources."
  },
  {
    "id": "java-int-006",
    "subjectId": "java-fundamentals",
    "subjectName": "Java",
    "difficulty": "advanced",
    "type": "mcq",
    "question": "Which statement about Java's HashMap is correct?",
    "options": [
      {
        "id": "a",
        "text": "It guarantees insertion order"
      },
      {
        "id": "b",
        "text": "It permits one null key and multiple null values"
      },
      {
        "id": "c",
        "text": "It sorts keys automatically"
      },
      {
        "id": "d",
        "text": "It is synchronized by default"
      }
    ],
    "correctOptionId": "b",
    "answer": "HashMap permits one null key and multiple null values, and it does not guarantee iteration order.",
    "explanation": "Use LinkedHashMap when insertion order matters, TreeMap for sorted keys, and an appropriate concurrent map or synchronization when concurrent access requires it."
  },
  {
    "id": "java-int-007",
    "subjectId": "java-fundamentals",
    "subjectName": "Java",
    "difficulty": "intermediate",
    "type": "short-answer",
    "question": "Explain the difference between JDK, JRE, and JVM. When would a developer need the JDK?",
    "answer": "The JVM executes Java bytecode. The JRE traditionally describes the runtime components needed to run Java applications, including the JVM and libraries. The JDK includes development tools such as the Java compiler plus the runtime components. A developer needs the JDK to compile, debug, and package Java applications.",
    "explanation": "A strong interview answer distinguishes execution from development. Modern Java distributions and modular packaging have changed how the JRE is distributed, but the conceptual distinction remains useful.",
    "keyPoints": [
      "JVM executes bytecode at runtime",
      "JRE = JVM plus core libraries to run programs",
      "JDK = JRE plus dev tools like javac, jar, debuggers",
      "Answer notes the developer needs the JDK to compile and package"
    ]
  }
];
