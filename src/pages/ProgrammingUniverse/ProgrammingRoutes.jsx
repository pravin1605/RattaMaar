import { Routes, Route } from "react-router-dom";
import ProgrammingLayout from "./ProgrammingLayout";
import ProgrammingHome from "./ProgrammingHome";
import ProgrammingSubjects from "./ProgrammingSubjects";
import ProgrammingSubject from "./ProgrammingSubject";
import ProgrammingPractice from "./ProgrammingPractice";
import ProgrammingProgress from "./ProgrammingProgress";
import ProgrammingInterviewLab from "./ProgrammingInterviewLab";

export default function ProgrammingRoutes() {
  return <Routes><Route path="/" element={<ProgrammingLayout />}>
    <Route index element={<ProgrammingHome />} />
    <Route path="subjects" element={<ProgrammingSubjects />} />
    <Route path="subjects/:subjectId" element={<ProgrammingSubject />} />
    <Route path="practice" element={<ProgrammingPractice />} />
    <Route path="interviews" element={<ProgrammingInterviewLab />} />
    <Route path="progress" element={<ProgrammingProgress />} />
  </Route></Routes>;
}
