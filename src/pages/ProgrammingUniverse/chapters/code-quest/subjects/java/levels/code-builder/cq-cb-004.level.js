export default {
  "id": "cq-cb-004",
  "chapterId": "code-quest",
  "subjectId": "java-fundamentals",
  "modeId": "code-builder",
  "levelNumber": 4,
  "title": "Fill the Class Blueprint",
  "difficulty": "beginner",
  "estimatedMinutes": 4,
  "challengeType": "fill-blanks",
  "instructions": "Four keywords are missing from this minimal class. Type each one into its slot so the program compiles and prints Volt.",
  "content": {
    "language": "java",
    "code": "public ____ Car {\n    String model;\n\n    public ____ (String model) {\n        this.model = model;\n    }\n\n    public static ____ main(String[] args) {\n        Car myCar = ____ Car(\"Volt\");\n        System.out.println(myCar.model);\n    }\n}",
    "blanks": [
      { "placeholder": "____", "context": "public ____ Car {" },
      { "placeholder": "____", "context": "public ____ (String model) {" },
      { "placeholder": "____", "context": "public static ____ main(String[] args) {" },
      { "placeholder": "____", "context": "Car myCar = ____ Car(\"Volt\");" }
    ]
  },
  "evaluation": { "strategy": "fill-blanks", "expectedBlanks": ["class", ["Car"], "void", "new"] },
  "hints": [
    "The first slot is the keyword that introduces a reference type, sitting between the access modifier and the type's name.",
    "The second slot repeats the type's own name with no return keyword — that is the signature of an initializer. The third is the return type the entry point must declare, and the fourth is the keyword placed in front of an initializer call to allocate an object."
  ],
  "explanation": {
    "concept": "Class header, constructor and main signatures",
    "summary": "A type is declared with public class Car. The initializer Car(String model) carries the class name and no return type. The entry point is public static void main(String[] args). Creating an object uses the allocation keyword: new Car(\"Volt\").",
    "details": "Adding a return type such as void to Car(String model) would silently turn it into an ordinary method, leaving the class without a constructor for the call in main. The constructor stores the argument in the field via this.model."
  },
  "rewards": { "xp": 18 },
  "version": 1
};
