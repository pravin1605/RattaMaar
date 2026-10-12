export default {
  "id": "cq-bh-010",
  "chapterId": "code-quest",
  "subjectId": "java-fundamentals",
  "modeId": "bug-hunter",
  "levelNumber": 10,
  "title": "The Average That Lost Its Fraction",
  "difficulty": "advanced",
  "estimatedMinutes": 4,
  "challengeType": "find-and-fix",
  "instructions": "The programmer wants average to hold 3.5 but the program stores 3.0. Choose the correction.",
  "content": {
    "language": "java",
    "code": "int total = 7;\nint items = 2;\ndouble average = total / items;\nSystem.out.println(average);",
    "prompt": "Which fix makes the printed average exact?",
    "choices": [
      { "id": "cast-one", "label": "Compute (double) total / items instead of total / items." },
      { "id": "int-result", "label": "Declare average as int instead of double." },
      { "id": "swap-operands", "label": "Write items / total inside the division." },
      { "id": "modulus", "label": "Use total % items to capture the leftover." }
    ]
  },
  "evaluation": { "strategy": "validated-correction", "expectedFixId": "cast-one" },
  "hints": [
    "The damage happens before the assignment: two whole-number operands already chose the whole-number flavor of division.",
    "Converting one side to a floating type before the division forces the fractional result to survive."
  ],
  "explanation": {
    "concept": "Integer division promoted too late",
    "summary": "total / items divides two ints and truncates to 3 before being widened into the double variable, so 3.0 is printed. Casting one operand, (double) total / items, makes the division itself floating-point and yields 3.5.",
    "details": "Declaring the result double is not enough — the division is evaluated on its own operand types first. Making items a double literal (or changing both operands to doubles) works too, but int average would still print a truncated value, swapping operands gives 0.0, and % reports the remainder, not the fraction."
  },
  "rewards": { "xp": 28 },
  "version": 1
};
