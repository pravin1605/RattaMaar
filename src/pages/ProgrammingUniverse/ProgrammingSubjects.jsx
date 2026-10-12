import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSubjects } from "./registry/subjectRegistry";
import { getLevelsForSubject } from "./registry/levelRegistry";
import { getInterviewQuestionCount } from "./registry/interviewQuestionRegistry";

export default function ProgrammingSubjects() {
  const subjects = getSubjects();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All subjects");
  const navigate = useNavigate();
  const filters = ["All subjects", ...new Set(subjects.map((subject) => subject.category))];
  const visible = useMemo(() => subjects.filter((subject) => (filter === "All subjects" || subject.category === filter) && `${subject.name} ${subject.description}`.toLowerCase().includes(query.toLowerCase())), [subjects, filter, query]);
  return <div className="pu-page">
    <div className="pu-page-heading"><span className="pu-eyebrow">SUBJECT CATALOGUE</span><h1>Choose a subject.</h1><p>Pick a programming language or computer-science subject. Each subject opens its own practice modes and available learning experiences.</p></div>
    <label className="pu-search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Java, Python, SQL, DSA…" aria-label="Search programming subjects" /></label>
    <div className="pu-filter-row">{filters.map((item) => <button key={item} className={`pu-filter${filter === item ? " selected" : ""}`} onClick={() => setFilter(item)}>{item}</button>)}</div>
    <div className="pu-catalog-grid">{visible.map((subject) => {
      const levelCount = getLevelsForSubject(subject.id).length;
      const interviewCount = getInterviewQuestionCount(subject.id);
      const status = levelCount ? `${levelCount} playable levels` : interviewCount ? `${interviewCount} interview questions` : "Learning pack planned";
      return <button className="pu-catalog-card" key={subject.id} onClick={() => navigate(`/programming/subjects/${subject.id}`)}><span className={`pu-subject-icon pu-subject-tone-${subject.id.length % 4}`}>{subject.icon}</span><span className={`pu-status ${levelCount || interviewCount ? "linked" : "planned"}`}>{levelCount || interviewCount ? "AVAILABLE" : "COMING LATER"}</span><strong>{subject.name}</strong><small>{subject.description}</small><div className="pu-catalog-footer"><span>{status}</span><span>Open ↗</span></div></button>;
    })}</div>
    {!visible.length && <div className="pu-empty-state"><strong>No subjects found</strong><p>Try another search or subject group.</p></div>}
    <section className="pu-interview-subject-cta"><div><span className="pu-eyebrow">INTERVIEW PREPARATION</span><h2>Practice technical interview questions</h2><p>Dynamic question packs, difficulty filters, model answers, explanations, and saved local progress.</p></div><button className="pu-primary-btn" onClick={() => navigate('/programming/interviews')}>Open Interview Lab ↗</button></section>
  </div>;
}
