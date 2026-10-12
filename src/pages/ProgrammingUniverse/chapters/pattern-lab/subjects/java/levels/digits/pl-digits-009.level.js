export default {
  "id": "pl-digits-009",
  "chapterId": "pattern-lab",
  "subjectId": "java-fundamentals",
  "modeId": "pattern-master",
  "categoryId": "digits",
  "levelNumber": 9,
  "title": "Palindrome by Reversal — Which One Fails?",
  "difficulty": "advanced",
  "estimatedMinutes": 5,
  "challengeType": "find-and-fix",
  "instructions": "The reversal method is used to test palindromes. One candidate exposes a bug in the code shown.",
  "content": {
    "language": "java",
    "prompt": "The program prints true for 12321. Which input makes the SAME code wrongly print true even though it is not a palindrome?",
    "code": "static boolean isPalindrome(int x) {\n    int original = x;\n    int reversed = 0;\n    while (x > 0) {\n        reversed = reversed * 10 + x % 10;\n        x /= 10;\n    }\n    return original == reversed;\n}",
    "choices": [
      { "id": "negative", "label": "-121 — the loop never runs, reversed stays 0, so it cannot wrongly print true" },
      { "id": "trailing", "label": "1210 — reversed drops the leading zero, but original 1210 != 121, so it is not wrongly true" },
      { "id": "none", "label": "None — the method is correct for every int" },
      { "id": "overflow", "label": "A large number whose reverse overflows int, e.g. 1_000_000_009 — reversed wraps around and can equal original by accident" }
    ],
    "missingLine": "reversed = reversed * 10 + x % 10; // int overflow risk for large inputs"
  },
  "evaluation": { "strategy": "validated-correction", "expectedFixId": "overflow" },
  "hints": [
    "For x = -121 the while condition fails immediately — what does the method return then?",
    "Think about which inputs quietly break the reversed accumulator rather than the loop condition."
  ],
  "explanation": {
    "concept": "limits of digit-reversal palindrome checks",
    "summary": "The negative case returns false (not wrongly true) and 1210 returns false, but reversing a large int can overflow and wrap to a value that makes the comparison unreliable.",
    "details": "1_000_000_009 reverses to 9_000_000_001 which exceeds Integer.MAX_VALUE; wrapped arithmetic can produce a false match. Robust fixes: use long for reversed, or compare digits from both ends without building the reverse."
  },
  "rewards": { "xp": 30 },
  "version": 1
};
