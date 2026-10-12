export default [
  {
    "id": "sql-int-008",
    "subjectId": "sql",
    "subjectName": "SQL",
    "difficulty": "intermediate",
    "type": "mcq",
    "question": "Table employees has 5 rows; departments has 3. How many rows does `SELECT * FROM employees e LEFT JOIN departments d ON e.dept_id = d.dept_id` return if two employees have a NULL dept_id?",
    "options": [
      { "id": "a", "text": "5 — every employee row appears, unmatched ones with NULL department columns" },
      { "id": "b", "text": "3 — only matched departments survive" },
      { "id": "c", "text": "15 — the Cartesian product" },
      { "id": "d", "text": "0 — NULL never joins" }
    ],
    "correctOptionId": "a",
    "answer": "A LEFT JOIN keeps all rows from the left table; rows without a match are padded with NULLs for the right-table columns.",
    "explanation": "With a plain equality condition, a NULL dept_id matches nothing, so those employees appear once each with NULL department fields. Understanding LEFT JOIN padding is a frequent follow-up to aggregate counting.",
    "keyPoints": ["Left table rows are never dropped", "Unmatched rows get NULL-padded columns", "NULL never satisfies an equality join"],
    "relatedPractice": "Code Quest → Query Master: JOIN row-count levels."
  },
  {
    "id": "sql-int-009",
    "subjectId": "sql",
    "subjectName": "SQL",
    "difficulty": "advanced",
    "type": "short-answer",
    "question": "What is a covering index and when would you create one?",
    "answer": "A covering index contains every column a query needs, so the database can answer the query entirely from the index without reading the table rows. You create one for frequent, performance-critical queries — for example an index on (dept_id, salary) covering `SELECT salary FROM employees WHERE dept_id = ?` — trading extra storage and slower writes for dramatically faster reads.",
    "explanation": "The strong answer explains index-only scans, mentions the include/extra-column idea, and acknowledges the write-performance cost. Interviewers often follow up asking why you would not cover-index everything.",
    "keyPoints": ["Index holds all columns the query selects/filters", "Avoids table (heap) lookups — index-only scan", "Speeds reads at the cost of storage and write speed", "Chosen for hot, repeated queries"],
    "relatedPractice": "Interview Arena → Database concepts; DBMS question pack."
  },
  {
    "id": "sql-int-010",
    "subjectId": "sql",
    "subjectName": "SQL",
    "difficulty": "beginner",
    "type": "mcq",
    "question": "Which clause filters rows BEFORE they are grouped?",
    "options": [
      { "id": "a", "text": "HAVING" },
      { "id": "b", "text": "WHERE" },
      { "id": "c", "text": "ORDER BY" },
      { "id": "d", "text": "LIMIT" }
    ],
    "correctOptionId": "b",
    "answer": "WHERE filters individual rows before GROUP BY forms groups; HAVING filters after aggregation.",
    "explanation": "Query execution order is FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. Placing an aggregate function in WHERE is a classic error this question guards against.",
    "keyPoints": ["WHERE runs before grouping", "HAVING runs after and can use aggregates", "Can recite the logical execution order"],
    "relatedPractice": "Code Quest → Query Master: HAVING error-finding level."
  }
];
