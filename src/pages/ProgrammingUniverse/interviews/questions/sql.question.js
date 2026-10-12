export default [
  {
    "id": "sql-int-001",
    "subjectId": "sql",
    "subjectName": "SQL",
    "difficulty": "beginner",
    "type": "mcq",
    "question": "Which clause filters individual rows before GROUP BY aggregation?",
    "options": [
      {
        "id": "a",
        "text": "HAVING"
      },
      {
        "id": "b",
        "text": "ORDER BY"
      },
      {
        "id": "c",
        "text": "WHERE"
      },
      {
        "id": "d",
        "text": "DISTINCT"
      }
    ],
    "correctOptionId": "c",
    "answer": "WHERE filters rows before grouping and aggregate calculations.",
    "explanation": "HAVING filters groups after aggregation, for example HAVING COUNT(*) > 3. WHERE generally cannot directly filter using an aggregate expression from that same SELECT level."
  },
  {
    "id": "sql-int-002",
    "subjectId": "sql",
    "subjectName": "SQL",
    "difficulty": "beginner",
    "type": "mcq",
    "question": "What does an INNER JOIN return?",
    "options": [
      {
        "id": "a",
        "text": "Every row from the left table regardless of matches"
      },
      {
        "id": "b",
        "text": "Only rows that satisfy the join condition in both tables"
      },
      {
        "id": "c",
        "text": "All possible row combinations"
      },
      {
        "id": "d",
        "text": "Only rows with NULL values"
      }
    ],
    "correctOptionId": "b",
    "answer": "An INNER JOIN returns rows with matching values according to its join condition.",
    "explanation": "A LEFT JOIN also retains unmatched left-side rows, filling right-side columns with NULL. The join condition determines what counts as a match."
  },
  {
    "id": "sql-int-003",
    "subjectId": "sql",
    "subjectName": "SQL",
    "difficulty": "intermediate",
    "type": "mcq",
    "question": "Why can COUNT(column_name) differ from COUNT(*)?",
    "options": [
      {
        "id": "a",
        "text": "COUNT(column_name) ignores NULL values in that column"
      },
      {
        "id": "b",
        "text": "COUNT(*) ignores every row with a NULL anywhere"
      },
      {
        "id": "c",
        "text": "COUNT(column_name) counts only unique values"
      },
      {
        "id": "d",
        "text": "There is never a difference"
      }
    ],
    "correctOptionId": "a",
    "answer": "COUNT(column_name) counts non-NULL values in that column; COUNT(*) counts rows.",
    "explanation": "If a table has five rows and two have NULL in the chosen column, COUNT(column_name) returns three while COUNT(*) returns five."
  },
  {
    "id": "sql-int-004",
    "subjectId": "sql",
    "subjectName": "SQL",
    "difficulty": "intermediate",
    "type": "mcq",
    "question": "What is the main purpose of a foreign key?",
    "options": [
      {
        "id": "a",
        "text": "To guarantee every query is fast"
      },
      {
        "id": "b",
        "text": "To enforce a relationship and referential integrity between tables"
      },
      {
        "id": "c",
        "text": "To encrypt a column"
      },
      {
        "id": "d",
        "text": "To automatically sort a table"
      }
    ],
    "correctOptionId": "b",
    "answer": "A foreign key constrains values to reference valid keys in another table or the same table.",
    "explanation": "Foreign keys help prevent orphaned references. Exact update/delete behavior depends on the constraint's configured actions and the database system."
  },
  {
    "id": "sql-int-005",
    "subjectId": "sql",
    "subjectName": "SQL",
    "difficulty": "advanced",
    "type": "mcq",
    "question": "Which ACID property means a committed transaction survives a system crash?",
    "options": [
      {
        "id": "a",
        "text": "Atomicity"
      },
      {
        "id": "b",
        "text": "Consistency"
      },
      {
        "id": "c",
        "text": "Isolation"
      },
      {
        "id": "d",
        "text": "Durability"
      }
    ],
    "correctOptionId": "d",
    "answer": "Durability means committed changes persist despite subsequent failures.",
    "explanation": "Atomicity is all-or-nothing, consistency preserves defined rules, isolation governs concurrent transactions, and durability protects committed results."
  },
  {
    "id": "sql-int-006",
    "subjectId": "sql",
    "subjectName": "SQL",
    "difficulty": "advanced",
    "type": "mcq",
    "question": "What is a common benefit of an index on a frequently filtered column?",
    "options": [
      {
        "id": "a",
        "text": "It always makes every write faster"
      },
      {
        "id": "b",
        "text": "It can reduce the amount of data scanned for matching rows"
      },
      {
        "id": "c",
        "text": "It removes the need for constraints"
      },
      {
        "id": "d",
        "text": "It guarantees a particular result order without ORDER BY"
      }
    ],
    "correctOptionId": "b",
    "answer": "An index can help the database locate matching rows without scanning the entire table.",
    "explanation": "Indexes consume storage and add maintenance cost to inserts, updates, and deletes. Query plans and workload determine whether an index helps."
  },
  {
    "id": "sql-int-007",
    "subjectId": "sql",
    "subjectName": "SQL",
    "difficulty": "intermediate",
    "type": "short-answer",
    "question": "Explain the difference between WHERE and HAVING, and give a situation where HAVING is needed.",
    "answer": "WHERE filters individual rows before grouping. HAVING filters groups after GROUP BY and aggregate calculations. For example, GROUP BY department_id HAVING COUNT(*) > 5 returns only departments with more than five rows or employees, depending on the table.",
    "explanation": "In an interview, mention the logical order: row filtering happens before grouping, while HAVING can filter using aggregate results such as COUNT, SUM, or AVG.",
    "keyPoints": [
      "Distinguishes filtering rows (WHERE) from filtering groups (HAVING)",
      "Explains execution order: WHERE before aggregation, HAVING after",
      "Uses GROUP BY alongside HAVING in the example",
      "Gives a correct sample query"
    ]
  }
];
