export default [
  {
    "id": "dbms-int-001",
    "subjectId": "dbms",
    "subjectName": "DBMS",
    "difficulty": "beginner",
    "type": "mcq",
    "question": "What is the primary purpose of a primary key?",
    "options": [
      {
        "id": "a",
        "text": "To uniquely identify each row in a table"
      },
      {
        "id": "b",
        "text": "To allow duplicate rows"
      },
      {
        "id": "c",
        "text": "To store only encrypted values"
      },
      {
        "id": "d",
        "text": "To sort results automatically"
      }
    ],
    "correctOptionId": "a",
    "answer": "A primary key uniquely identifies each row and cannot contain NULL values.",
    "explanation": "A primary key may consist of one column or multiple columns. A table has one primary-key constraint, though it can have other unique constraints."
  },
  {
    "id": "dbms-int-002",
    "subjectId": "dbms",
    "subjectName": "DBMS",
    "difficulty": "beginner",
    "type": "mcq",
    "question": "What is database normalization primarily intended to reduce?",
    "options": [
      {
        "id": "a",
        "text": "Data redundancy and update anomalies"
      },
      {
        "id": "b",
        "text": "The number of SQL keywords"
      },
      {
        "id": "c",
        "text": "The need for backups"
      },
      {
        "id": "d",
        "text": "All joins"
      }
    ],
    "correctOptionId": "a",
    "answer": "Normalization organizes relational data to reduce unnecessary duplication and anomalies.",
    "explanation": "Well-designed normalization makes insert, update, and delete behavior more reliable. Denormalization may be chosen deliberately for specific performance needs."
  },
  {
    "id": "dbms-int-003",
    "subjectId": "dbms",
    "subjectName": "DBMS",
    "difficulty": "intermediate",
    "type": "mcq",
    "question": "What does atomicity mean in ACID?",
    "options": [
      {
        "id": "a",
        "text": "A transaction runs only at midnight"
      },
      {
        "id": "b",
        "text": "A transaction's operations all succeed or are rolled back as a unit"
      },
      {
        "id": "c",
        "text": "A transaction cannot read data"
      },
      {
        "id": "d",
        "text": "A table has only one column"
      }
    ],
    "correctOptionId": "b",
    "answer": "Atomicity provides all-or-nothing transaction behavior.",
    "explanation": "If a transaction fails before commit, its partial changes should not remain as if the transaction had succeeded."
  },
  {
    "id": "dbms-int-004",
    "subjectId": "dbms",
    "subjectName": "DBMS",
    "difficulty": "intermediate",
    "type": "mcq",
    "question": "What is the difference between a clustered index and a nonclustered index in systems that support both?",
    "options": [
      {
        "id": "a",
        "text": "A clustered index influences the physical or primary row organization; a nonclustered index is a separate lookup structure"
      },
      {
        "id": "b",
        "text": "A nonclustered index can never contain more than one column"
      },
      {
        "id": "c",
        "text": "A clustered index encrypts the table"
      },
      {
        "id": "d",
        "text": "They are identical in every database engine"
      }
    ],
    "correctOptionId": "a",
    "answer": "A clustered index organizes table rows around the index key in engines that use that model; a nonclustered index stores key entries and row references separately.",
    "explanation": "Details vary by database engine. Some systems use different terminology or have different limits, so always answer with the engine in mind."
  },
  {
    "id": "dbms-int-005",
    "subjectId": "dbms",
    "subjectName": "DBMS",
    "difficulty": "advanced",
    "type": "mcq",
    "question": "What is a dirty read?",
    "options": [
      {
        "id": "a",
        "text": "Reading a value written by another transaction that has not committed"
      },
      {
        "id": "b",
        "text": "Reading only indexed columns"
      },
      {
        "id": "c",
        "text": "Reading the same committed row twice"
      },
      {
        "id": "d",
        "text": "A failed backup"
      }
    ],
    "correctOptionId": "a",
    "answer": "A dirty read occurs when a transaction reads uncommitted data from another transaction.",
    "explanation": "If the writer rolls back, the reader has observed a value that never became committed state. Isolation levels determine which anomalies are allowed."
  },
  {
    "id": "dbms-int-006",
    "subjectId": "dbms",
    "subjectName": "DBMS",
    "difficulty": "advanced",
    "type": "mcq",
    "question": "Why can adding an index slow down write-heavy workloads?",
    "options": [
      {
        "id": "a",
        "text": "The database must maintain the index when indexed data changes"
      },
      {
        "id": "b",
        "text": "Indexes disable transactions"
      },
      {
        "id": "c",
        "text": "Indexes make every row larger in every storage engine"
      },
      {
        "id": "d",
        "text": "The database cannot use indexes and constraints together"
      }
    ],
    "correctOptionId": "a",
    "answer": "Insert, update, and delete operations may need to update associated index structures.",
    "explanation": "Indexes can speed up reads but add storage and write-maintenance costs. Choose indexes based on actual query patterns and measured execution plans."
  },
  {
    "id": "dbms-int-007",
    "subjectId": "dbms",
    "subjectName": "DBMS",
    "difficulty": "intermediate",
    "type": "short-answer",
    "question": "Explain normalization and describe the goal of first, second, and third normal forms at a high level.",
    "answer": "Normalization structures relational tables to reduce redundancy and update anomalies. 1NF requires atomic column values and no repeating groups. 2NF requires 1NF and removes partial dependency of a non-key attribute on part of a composite candidate key. 3NF builds on 2NF and removes relevant transitive dependencies of non-key attributes on keys.",
    "explanation": "Avoid saying normalization always improves performance. Its main goal is sound data structure and integrity; query performance and deliberate denormalization are separate design trade-offs.",
    "keyPoints": [
      "Defines normalization goal (reduce redundancy, avoid anomalies)",
      "Names at least 1NF, 2NF, 3NF with the rule each enforces",
      "Gives a small example or functional-dependency reasoning",
      "Mentions trade-off such as joins vs redundancy (denormalization)"
    ]
  }
];
