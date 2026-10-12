export default [
  {
    "id": "dbms-int-008",
    "subjectId": "dbms",
    "subjectName": "DBMS",
    "difficulty": "beginner",
    "type": "mcq",
    "question": "Which ACID property guarantees that a completed transaction survives a power failure?",
    "options": [
      { "id": "a", "text": "Atomicity" },
      { "id": "b", "text": "Consistency" },
      { "id": "c", "text": "Isolation" },
      { "id": "d", "text": "Durability" }
    ],
    "correctOptionId": "d",
    "answer": "Durability: once a transaction commits, its effects are permanent, typically backed by write-ahead logging and disk-backed journals.",
    "explanation": "Atomicity is all-or-nothing execution, consistency keeps constraints valid, isolation controls concurrency interference, and durability is the crash-survival guarantee. Interviewers like follow-ups asking HOW durability is implemented — mention redo logs and fsync.",
    "keyPoints": ["Durability = committed changes survive crashes", "Implemented via write-ahead/redo logging", "Can distinguish from atomicity"],
    "relatedPractice": "Interview Arena → DBMS question bank."
  },
  {
    "id": "dbms-int-009",
    "subjectId": "dbms",
    "subjectName": "DBMS",
    "difficulty": "intermediate",
    "type": "mcq",
    "question": "What is the smallest number of tables required to model a strict one-to-many relationship between customers and orders?",
    "options": [
      { "id": "a", "text": "1 — embed orders inside customers" },
      { "id": "b", "text": "2 — a customer table plus an order table with a customer foreign key" },
      { "id": "c", "text": "3 — an extra junction table is always needed" },
      { "id": "d", "text": "0 — relationships need no tables" }
    ],
    "correctOptionId": "b",
    "answer": "Two tables: each order row stores the primary key of its customer. A junction (bridge) table is only needed for many-to-many relationships.",
    "explanation": "Foreign keys live on the many side. Repeating this clearly shows you understand relational modelling, and the natural follow-up is why embedding lists in one table breaks first normal form.",
    "keyPoints": ["Foreign key on the many side", "Junction tables are for many-to-many", "Repeating groups violate 1NF"],
    "relatedPractice": "Code Quest → Query Master schema levels."
  },
  {
    "id": "dbms-int-010",
    "subjectId": "dbms",
    "subjectName": "DBMS",
    "difficulty": "advanced",
    "type": "short-answer",
    "question": "Explain the difference between a clustered and a non-clustered (secondary) index, and why a table usually has only one clustered index.",
    "answer": "A clustered index determines the physical order of rows in the table — the leaf level IS the data — so a table can have only one (in InnoDB, the primary key is the clustered index; a unique key or hidden row id acts as fallback). A non-clustered secondary index stores the indexed column values plus a pointer (the primary key) back to the rows, leaving physical order untouched. Range scans on the clustered key are cheap because rows are already ordered and adjacent.",
    "explanation": "The answer shows storage-engine awareness: one clustered ordering per table because data rows can physically be arranged only one way; secondary indexes pay an extra lookup (a 'table access by index rowid' or index nested-loop) unless they are covering.",
    "keyPoints": ["Clustered index defines physical row order", "Only one per table (primary key in InnoDB)", "Secondary index stores key + pointer to PK", "Covering indexes avoid the extra lookup", "Insert order affects page splits/fragmentation"],
    "relatedPractice": "Interview Arena → DBMS advanced filter."
  }
];
