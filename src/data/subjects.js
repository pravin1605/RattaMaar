
const subjects = [
  {
    id: "hibernate",
    name: "Hibernate",
    description: "ORM, JPA, CRUD, caching and relationships",
    icon: "🗄️",
    color: "purple",
    notes: [
      {
        id: "hibernate-01",
        title: "Introduction to Hibernate",
        file: "/hibernate/part_01_introduction.html",
      },
      {
        id: "hibernate-02",
        title: "ORM",
        file: "/hibernate/part_02_Orm.html",
      },
      {
        id: "hibernate-03",
        title: "JPA",
        file: "/hibernate/part_03_jpa.html",
      },
      {
        id: "hibernate-04",
        title: "Life Cycle",
        file: "/hibernate/part_04_lifeCycle.html",
      },
      {
        id: "hibernate-05",
        title: "Persistence",
        file: "/hibernate/part_05_Persistence.html",
      },
      {
        id: "hibernate-06",
        title: "Entity Class",
        file: "/hibernate/part_06_entityclass.html",
      },
      {
        id: "hibernate-07",
        title: "Annotations",
        file: "/hibernate/part_07_Annotation.html",
      },
      {
        id: "hibernate-08",
        title: "Caching",
        file: "/hibernate/part_08_caching.html",
      },
      {
        id: "hibernate-09",
        title: "Hibernate JPA CRUD",
        file: "/hibernate/part_09_Hibernate_jpa_crud.html",
      },
      {
        id: "hibernate-10",
        title: "Hibernate Structure",
        file: "/hibernate/part_10_Hibernate_structure.html",
      },
      {
        id: "hibernate-11",
        title: "One to One Relationship",
        file: "/hibernate/part_11_1_to_1.html",
      },
      {
        id: "hibernate-12",
        title: "One to Many Relationship",
        file: "/hibernate/part_12_1_to_m.html",
      },
      {
        id: "hibernate-13",
        title: "Many to One Relationship",
        file: "/hibernate/part_13_Hibernate_M_1.html",
      },
      {
        id: "hibernate-14",
        title: "Many to Many Relationship",
        file: "/hibernate/part_14_Hibernate_M_M.html",
      },
      {
        id: "hibernate-15",
        title: "Bidirectional One to One",
        file: "/hibernate/part_15_bi_1_to_1.html",
      },
      {
        id: "hibernate-16",
        title: "Bidirectional One to Many",
        file: "/hibernate/part_16_bi_1_to_M.html",
      },
    ],
  },

  {
    id: "java-8-features",
    name: "Java 8 Features",
    description: "Lambda, Stream API, Functional Interface and more",
    icon: "☕",
    color: "orange",
    notes: [
      {
        id: "java8-01",
        title: "Functional Interface Methods",
        file: "/java-8-features/FUNCTIONAL_INTERFACE_METHODS.html",
      },
      {
        id: "java8-02",
        title: "Higher Ordered Function",
        file: "/java-8-features/HIGH_ORDERED_FUNCTION.html",
      },
      {
        id: "java8-03",
        title: "Lambda Expressions",
        file: "/java-8-features/LAMBDA_EXPRESSIONS.html",
      },
      {
        id: "java8-04",
        title: "Method Reference",
        file: "/java-8-features/METHOD_REFERENCE.html",
      },
      {
        id: "java8-05",
        title: "Multithreading",
        file: "/java-8-features/MUTILTHREADING.html",
      },
      {
        id: "java8-06",
        title: "Stream API",
        file: "/java-8-features/STREAM_API.html",
      },
    ],
  },

  {
    id: "jdbc",
    name: "JDBC",
    description: "Java Database Connectivity and database programming",
    icon: "🔗",
    color: "blue",
    notes: [
      {
        id: "jdbc-01",
        title: "Introduction",
        file: "/jdbc/part_01_introduction.html",
      },
      {
        id: "jdbc-02",
        title: "Statement",
        file: "/jdbc/part_02_Statement.html",
      },
      {
        id: "jdbc-03",
        title: "Prepared Statement",
        file: "/jdbc/part_03_prepared.html",
      },
      {
        id: "jdbc-04",
        title: "Stored Procedure",
        file: "/jdbc/part_04_storedProcedure.html",
      },
      {
        id: "jdbc-05",
        title: "Exception Handling",
        file: "/jdbc/part_05_exception.html",
      },
      {
        id: "jdbc-06",
        title: "JDBC",
        file: "/jdbc/part_06.html",
      },
      {
        id: "jdbc-07",
        title: "Connection Pool",
        file: "/jdbc/part_07_connectionpool.html",
      },
    ],
  },

  {
    id: "javascript",
    name: "JavaScript",
    description: "Modern JavaScript concepts and complete notes",
    icon: "⚡",
    color: "yellow",
    notes: [
      {
        id: "js-01",
        title: "Introduction",
        file: "/js/js_intro_notes.html",
      },
      {
        id: "js-02",
        title: "Variables",
        file: "/js/js_variables_notes.html",
      },
      {
        id: "js-03",
        title: "Data Types",
        file: "/js/js_data_types_notes.html",
      },
      {
        id: "js-04",
        title: "Strings",
        file: "/js/js_strings_complete_notes.html",
      },
      {
        id: "js-05",
        title: "Arrays",
        file: "/js/js_arrays_complete_notes.html",
      },
      {
        id: "js-06",
        title: "Functions",
        file: "/js/js_functions_complete_notes.html",
      },
      {
        id: "js-07",
        title: "Objects",
        file: "/js/js_objects_complete_notes.html",
      },
      {
        id: "js-08",
        title: "Hoisting",
        file: "/js/js_hoisting_notes.html",
      },
      {
        id: "js-09",
        title: "DOM",
        file: "/js/js_dom_complete_notes.html",
      },
      {
        id: "js-10",
        title: "Events",
        file: "/js/js_events_complete_notes.html",
      },
      {
        id: "js-11",
        title: "Promises and Async",
        file: "/js/js_promises_async_notes.html",
      },
      {
        id: "js-12",
        title: "Async JavaScript",
        file: "/js/js_async_complete_notes.html",
      },
      {
        id: "js-13",
        title: "ES6",
        file: "/js/es6_notes.html",
      },
    ],
  },

  {
    id: "plsql",
    name: "PL/SQL",
    description: "Oracle PL/SQL programming notes",
    icon: "🛢️",
    color: "red",
    notes: [
      {
        id: "plsql-01",
        title: "Introduction",
        file: "/plsql/plsql_part1.html",
      },
      {
        id: "plsql-02",
        title: "Variables and Datatypes",
        file: "/plsql/plsql_part2_variables_datatypes.html",
      },
      {
        id: "plsql-03",
        title: "Anchored Datatypes",
        file: "/plsql/plsql_part3_anchored_datatypes.html",
      },
      {
        id: "plsql-04",
        title: "Conditional Statements",
        file: "/plsql/plsql_part4_conditional_statements.html",
      },
      {
        id: "plsql-05",
        title: "Loops",
        file: "/plsql/plsql_part5_loops.html",
      },
      {
        id: "plsql-06",
        title: "Cursors",
        file: "/plsql/plsql_part6_cursors_cards.html",
      },
      {
        id: "plsql-07",
        title: "Exceptions",
        file: "/plsql/plsql_part7_exceptions.html",
      },
      {
        id: "plsql-08",
        title: "Stored Procedures",
        file: "/plsql/plsql_part8_stored_procedures.html",
      },
      {
        id: "plsql-09",
        title: "Functions",
        file: "/plsql/plsql_part9_functions.html",
      },
      {
        id: "plsql-10",
        title: "Triggers",
        file: "/plsql/plsql_part10_triggers.html",
      },
      {
        id: "plsql-11",
        title: "Sequences",
        file: "/plsql/plsql_part11_sequences.html",
      },
      {
        id: "plsql-12",
        title: "Index",
        file: "/plsql/plsql_part12_index.html",
      },
    ],
  },

  {
    id: "react",
    name: "React",
    description: "React components, hooks, routing and state management",
    icon: "⚛️",
    color: "cyan",
    notes: [
      {
        id: "react-01",
        title: "Introduction",
        file: "/react/part_01_introduction.html",
      },
      {
        id: "react-02",
        title: "Components",
        file: "/react/part_02_components.html",
      },
      {
        id: "react-03",
        title: "State",
        file: "/react/part_03_state.html",
      },
      {
        id: "react-04",
        title: "Functional Based Components",
        file: "/react/part_04_FBC.html",
      },
      {
        id: "react-05",
        title: "Hooks",
        file: "/react/part_05_hooks.html",
      },
      {
        id: "react-06",
        title: "Props",
        file: "/react/part_06_props.html",
      },
      {
        id: "react-07",
        title: "Context API",
        file: "/react/part_07_contextApi.html",
      },
      {
        id: "react-08",
        title: "Lifecycle",
        file: "/react/part_08_lifecycle.html",
      },
      {
        id: "react-09",
        title: "useEffect",
        file: "/react/part_09_useEffect.html",
      },
      {
        id: "react-10",
        title: "React Routing",
        file: "/react/part_10_react_routing.html",
      },
      {
        id: "react-11",
        title: "CSS",
        file: "/react/part_11_css.html",
      },
      {
        id: "react-12",
        title: "useCallback",
        file: "/react/part_12_useCallback.html",
      },
      {
        id: "react-13",
        title: "Event Handling",
        file: "/react/part_13_eventHandling.html",
      },
      {
        id: "react-14",
        title: "Forms",
        file: "/react/part_14_form.html",
      },
      {
        id: "react-15",
        title: "useRef",
        file: "/react/part_15_userRafe.html",
      },
      {
        id: "react-16",
        title: "useMemo",
        file: "/react/react_16_userMemo.html",
      },
    ],
  },

  {
    id: "servlet",
    name: "Servlet",
    description: "Java Servlet technology and web development",
    icon: "🌐",
    color: "green",
    notes: [
      ...Array.from({ length: 11 }, (_, index) => ({
        id: `servlet-${String(index + 1).padStart(2, "0")}`,
        title: `Servlet Part ${index + 1}`,
        file: `/servlet/part_${String(index + 1).padStart(2, "0")}.html`,
      })),
    ],
  },

  {
    id: "spring-boot",
    name: "Spring Boot",
    description: "Spring Boot application development",
    icon: "🍃",
    color: "emerald",
    notes: [
      ...Array.from({ length: 6 }, (_, index) => ({
        id: `spring-boot-${String(index + 1).padStart(2, "0")}`,
        title: `Spring Boot Part ${index + 1}`,
        file: `/spring-boot/boot_${String(index + 1).padStart(2, "0")}.html`,
      })),
    ],
  },

  {
    id: "spring-core",
    name: "Spring Core",
    description: "Core Spring framework concepts",
    icon: "🌱",
    color: "teal",
    notes: [
      ...Array.from({ length: 9 }, (_, index) => ({
        id: `spring-core-${String(index + 1).padStart(2, "0")}`,
        title: `Spring Core Part ${index + 1}`,
        file: `/spring-core/part_${String(index + 1).padStart(2, "0")}.html`,
      })),
    ],
  },

  {
    id: "spring-mvc",
    name: "Spring MVC",
    description: "Spring MVC web application development",
    icon: "🚀",
    color: "indigo",
    notes: [
      {
        id: "spring-mvc-01",
        title: "Spring MVC Part 1",
        file: "/spring-mvc/mvc_01.html",
      },
    ],
  },
];

export default subjects;

