export default [
  {
    "id": "oop-int-001",
    "subjectId": "oop",
    "subjectName": "OOP",
    "difficulty": "beginner",
    "type": "mcq",
    "question": "What is the relationship between a class and an object?",
    "options": [
      {
        "id": "a",
        "text": "A class is a blueprint that defines state and behavior; an object is a runtime instance of that blueprint"
      },
      {
        "id": "b",
        "text": "They are two spellings for the same thing"
      },
      {
        "id": "c",
        "text": "An object is the template and the class is one copy of it"
      },
      {
        "id": "d",
        "text": "A class can exist only after its object is garbage-collected"
      }
    ],
    "correctOptionId": "a",
    "answer": "A class defines structure and behavior; objects are concrete instances created from it, each with its own state.",
    "explanation": "Interviewers expect the blueprint/instance distinction: one class can produce many objects, each holding separate field values while sharing the same defined behavior."
  },
  {
    "id": "oop-int-002",
    "subjectId": "oop",
    "subjectName": "OOP",
    "difficulty": "intermediate",
    "type": "mcq",
    "question": "What is the real benefit of exposing data through getters and setters instead of public fields?",
    "options": [
      {
        "id": "a",
        "text": "The compiler rejects direct field access otherwise"
      },
      {
        "id": "b",
        "text": "Accessors can enforce invariants and hide the internal representation while keeping the public API stable"
      },
      {
        "id": "c",
        "text": "They automatically make the object thread-safe"
      },
      {
        "id": "d",
        "text": "They reduce the number of lines in the class"
      }
    ],
    "correctOptionId": "b",
    "answer": "Getters and setters centralize validation and let the implementation change without breaking callers.",
    "explanation": "Encapsulation protects invariants such as balance greater than or equal to zero and lets you alter storage or derive values later. Accessors do not synchronize by themselves, and they usually add rather than remove lines; the payoff is controlled change."
  },
  {
    "id": "oop-int-003",
    "subjectId": "oop",
    "subjectName": "OOP",
    "difficulty": "intermediate",
    "type": "short-answer",
    "question": "When would you choose composition over inheritance? Give the reasoning an interviewer wants to hear.",
    "answer": "Inheritance models an is-a relationship and couples a subclass to the parent's implementation; changes in the parent can silently break subclasses (the fragile base class problem), and Java allows only single class inheritance. Composition models a has-a relationship: an object delegates work to collaborator instances, usually behind interfaces. I would prefer composition when I am reusing behavior rather than expressing a true subtype, when the collaborator might need to vary at runtime or be replaced in tests, or when a hierarchy is starting to grow by combining orthogonal features. Inheritance stays appropriate when polymorphic substitution is the goal and the subtype relationship is genuine, for example SQLException under Exception.",
    "explanation": "Interviewers look for the is-a versus has-a test, awareness of tight coupling and fragile base classes, and the practical point that composition plus interfaces keeps classes small and testable. Mentioning java.util.Properties as a composition misuse of Hashtable shows depth.",
    "keyPoints": [
      "Inheritance means is-a and couples subclass to parent implementation; composition means has-a plus delegation",
      "Composition allows swapping collaborators at runtime and easy mocking in tests",
      "Prefer composition when reusing behavior, when feature axes multiply, or when fragile base class risk is high",
      "Inheritance is still right for genuine subtypes that need polymorphic substitution"
    ]
  },
  {
    "id": "oop-int-004",
    "subjectId": "oop",
    "subjectName": "OOP",
    "difficulty": "beginner",
    "type": "mcq",
    "question": "Given:\nclass Animal {\n  String speak() { return \"Some sound\"; }\n}\nclass Dog extends Animal {\n  String speak() { return \"Woof\"; }\n}\nWhat does this print?\nAnimal a = new Dog();\nSystem.out.println(a.speak());",
    "options": [
      {
        "id": "a",
        "text": "Some sound, because the reference type is Animal"
      },
      {
        "id": "b",
        "text": "Woof"
      },
      {
        "id": "c",
        "text": "It does not compile because Animal cannot point to a Dog"
      },
      {
        "id": "d",
        "text": "A random choice between the two strings"
      }
    ],
    "correctOptionId": "b",
    "answer": "Woof. Overridden instance methods are dispatched on the runtime type of the object, not the declared type of the reference.",
    "explanation": "This is runtime polymorphism: the compiler checks that Animal declares speak(), then the JVM invokes the Dog implementation because the actual object is a Dog. Method selection for overridden instance methods happens at runtime."
  },
  {
    "id": "oop-int-005",
    "subjectId": "oop",
    "subjectName": "OOP",
    "difficulty": "intermediate",
    "type": "short-answer",
    "question": "Is abstraction the same thing as an interface? Explain the difference and how they relate.",
    "answer": "No. Abstraction is the object-oriented principle of exposing only the essential behavior and hiding implementation details, so clients depend on what a thing does rather than how it does it. An interface is one concrete language construct used to realize abstraction: it declares a contract, for example PaymentGateway.process(order), and different classes can supply card, wallet, or mock implementations behind the same abstraction. Abstraction is broader than interfaces: abstract classes, package boundaries, and REST APIs express abstraction too, and since Java 8 interfaces can even carry default implementation details, so using an interface does not automatically mean clean abstraction. In an interview I would summarize it as abstraction being the design goal and the interface being a tool that formalizes it.",
    "explanation": "Interviewers check whether the candidate separates the principle from the mechanism. A strong answer names other abstraction vehicles (abstract classes, APIs), notes that interface is the most complete form of contract in Java, and links abstraction to substitutability and testability.",
    "keyPoints": [
      "Abstraction is the principle of hiding implementation and exposing intent",
      "An interface is a language construct that formalizes one such contract",
      "Abstraction can also be achieved with abstract classes or API boundaries",
      "Depending on abstractions instead of concrete types enables swapping and mocking"
    ]
  },
  {
    "id": "oop-int-006",
    "subjectId": "oop",
    "subjectName": "OOP",
    "difficulty": "intermediate",
    "type": "short-answer",
    "question": "What is constructor chaining and in what order do the constructors actually run?",
    "answer": "Constructor chaining means one constructor delegates to another so a single place holds the full initialization logic. Inside the same class it uses this(arguments) as the first statement of a constructor; across the hierarchy each constructor implicitly or explicitly calls super(arguments), which must also be first. Running new Account(\"42\") with Account(String id) calling this(id, 0.0) and the two-argument constructor inheriting from BaseEntity executes: BaseEntity(), then Account(String id, double balance), then the body of Account(String id) last. The benefit is avoiding duplicated initialization, collapsing telescoping constructors into one canonical constructor, and keeping the rule that fields are initialized from the top of the hierarchy downward.",
    "explanation": "Interviewers want the this-versus-super distinction, the first-statement rule, and the execution order: superclass constructors complete before subclass constructor bodies. Knowing that the compiler inserts a no-argument super() call when none is written is a plus.",
    "keyPoints": [
      "this(...) chains to a sibling constructor in the same class; super(...) chains to the parent",
      "The chained call must be the first statement of the constructor",
      "Execution order is superclass constructor first, then subclass constructor bodies",
      "Chaining removes duplication and collapses telescoping constructors into one canonical path"
    ]
  },
  {
    "id": "oop-int-007",
    "subjectId": "oop",
    "subjectName": "OOP",
    "difficulty": "advanced",
    "type": "short-answer",
    "question": "State the Single Responsibility Principle and illustrate it with a class you would split.",
    "answer": "The Single Responsibility Principle says a class should have one reason to change, meaning it should serve one actor or responsibility. For example, an Invoice class that computes totals, renders a PDF, and writes rows to the database actually has three responsibilities: when the pricing rules change the billing team edits the class, when branding changes the design team edits it, and when the schema changes the persistence code forces edits. I would split it into Invoice holding the domain rules, InvoicePdfExporter, and InvoiceRepository. The payoff is smaller classes that are easier to test in isolation, fewer merge conflicts, and changes that stay local. I would add that SRP is about responsibilities, not method counts: a class may have many methods as long as they all serve the same actor.",
    "explanation": "Good answers quote the one-reason-to-change phrasing rather than one-method-per-class, name the actors driving change, and give concrete splits. Interviewers also probe whether the candidate applies it pragmatically instead of fragmenting code excessively.",
    "keyPoints": [
      "One reason to change means one responsibility or actor per class",
      "Concrete split example such as Invoice into domain logic, PDF export, and persistence",
      "Benefits: testability, localized change, less merge conflict",
      "It is about actors and cohesion, not raw line or method count"
    ]
  },
  {
    "id": "oop-int-008",
    "subjectId": "oop",
    "subjectName": "OOP",
    "difficulty": "intermediate",
    "type": "mcq",
    "question": "Which statement correctly contrasts overriding and overloading?",
    "options": [
      {
        "id": "a",
        "text": "Both are resolved at runtime by the JVM"
      },
      {
        "id": "b",
        "text": "Overriding replaces a superclass method with the same signature and binds at runtime to the object's actual type, while overloading shares a name with different parameter lists and is resolved at compile time"
      },
      {
        "id": "c",
        "text": "Overloading is possible by changing only the return type"
      },
      {
        "id": "d",
        "text": "An overridden method can be private in the superclass"
      }
    ],
    "correctOptionId": "b",
    "answer": "Overriding is runtime polymorphism with the same signature; overloading is compile-time selection among different parameter lists.",
    "explanation": "Overloads must differ in parameter count, type, or order, and return type alone is not enough. Private and static superclass methods are not overridden; static methods are hidden, and private methods are simply invisible to the subclass."
  },
  {
    "id": "oop-int-009",
    "subjectId": "oop",
    "subjectName": "OOP",
    "difficulty": "advanced",
    "type": "mcq",
    "question": "interface A { default String hello() { return \"A\"; } }\ninterface B { default String hello() { return \"B\"; } }\nclass C implements A, B { }\nWhat happens when class C is compiled, and how does Java generally avoid the diamond problem?",
    "options": [
      {
        "id": "a",
        "text": "It compiles and hello() returns A because interfaces load in alphabetical order"
      },
      {
        "id": "b",
        "text": "The compiler reports an error; C must override hello() itself, and the same conflict cannot arise from classes because a class may extend only one class"
      },
      {
        "id": "c",
        "text": "It compiles and the choice is made at runtime"
      },
      {
        "id": "d",
        "text": "Java forbids any class from implementing two interfaces"
      }
    ],
    "correctOptionId": "b",
    "answer": "Two inherited default methods with the same signature create a compile-time conflict that C must resolve by overriding hello(), possibly calling A.super.hello() or B.super.hello(). Java prevents the classic diamond among classes with single class inheritance.",
    "explanation": "The diamond problem is ambiguity from two inherited implementations. Java's rules: one superclass only, so class-level diamonds are impossible; for interface defaults the compiler forces an explicit override instead of guessing a precedence order."
  },
  {
    "id": "oop-int-010",
    "subjectId": "oop",
    "subjectName": "OOP",
    "difficulty": "advanced",
    "type": "short-answer",
    "question": "How do you design an immutable class in Java, and why would you want one?",
    "answer": "A mutable object can change its state after creation, so anyone holding a reference may observe surprising changes. To build an immutable class like a Money value type: declare the class final so subclasses cannot add mutable behavior, make every field private and final, set all state in the constructor and validate it there, provide no setters, and defensively copy any mutable input or output such as a Date or List, or expose unmodifiable views. The benefits are thread-safety without synchronization, safe use as HashMap keys because the hash code cannot drift, easier reasoning since a reference always means the same value, and failure atomicity where a half-applied update cannot exist. The cost is allocating a new object per change, which is acceptable for value-like types such as String and LocalDate.",
    "explanation": "Interviewers check the concrete recipe (final class, private final fields, no setters, defensive copies) more than the slogan. Connecting immutability to concurrency and hash-key safety shows the real motivation.",
    "keyPoints": [
      "Class final, all fields private and final, full state initialized and validated in the constructor",
      "No setters; every change returns a new instance",
      "Defensive copies or unmodifiable views for mutable fields",
      "Benefits: thread-safety, safe map keys, easier reasoning, failure atomicity"
    ]
  }
];
