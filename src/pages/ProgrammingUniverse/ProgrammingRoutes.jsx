// import { Routes, Route } from "react-router-dom";
// import ProgrammingLayout from "./ProgrammingLayout";
// import ProgrammingHome from "./ProgrammingHome";
// import ProgrammingSubjects from "./ProgrammingSubjects";
// import ProgrammingSubject from "./ProgrammingSubject";
// import ProgrammingPractice from "./ProgrammingPractice";
// import ProgrammingProgress from "./ProgrammingProgress";
// import ProgrammingInterviewLab from "./ProgrammingInterviewLab";

// export default function ProgrammingRoutes() {
//   return <Routes><Route path="/" element={<ProgrammingLayout />}>
//     <Route index element={<ProgrammingHome />} />
//     <Route path="subjects" element={<ProgrammingSubjects />} />
//     <Route path="subjects/:subjectId" element={<ProgrammingSubject />} />
//     <Route path="practice" element={<ProgrammingPractice />} />
//     <Route path="interviews" element={<ProgrammingInterviewLab />} />
//     <Route path="progress" element={<ProgrammingProgress />} />
//   </Route></Routes>;
// }


/**
 * Programming Universe routing documentation
 * -------------------------------------------
 *
 * CANONICAL ROUTING FILE: src/App.jsx
 *
 * The Programming Universe routes live inside the /programming parent route
 * in App.jsx:
 *
 *   /programming                     Universe home
 *   /programming/subjects            Subject picker
 *   /programming/subjects/:subjectId Subject launchpad
 *   /programming/chapters/:chapterId Chapter paths + selected level map (?subject=, ?path=)
 *   /programming/practice            Code Quest mode picker / level map (?subject=, ?mode=)
 *   /programming/play/:levelId       Gameplay
 *   /programming/interviews          Interview Arena (?subject=)
 *   /programming/progress            Progress and achievements
 *
 * This file previously declared a second, incomplete route table (it had no
 * chapter or play routes). It is not imported anywhere, so it now defines no
 * routes, which prevents two configurations from drifting apart.
 * Do not import this file into App.jsx.
 */

export {};