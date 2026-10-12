import catalogueSubjects from "../data/programmingSubjects";

// Subject discovery is deliberately independent of NotesWeb's notes catalogue.
const configModules = import.meta.glob("../subjects/**/subject.config.js", { eager: true, import: "default" });
const subjectConfigs = Object.values(configModules).filter(Boolean);

export const subjects = catalogueSubjects.map((catalogueItem) => {
  const config = subjectConfigs.find((item) => item.id === catalogueItem.id) || {};
  return { ...catalogueItem, ...config };
});

export function getSubjects() { return subjects; }
export function getSubjectById(subjectId) { return subjects.find((subject) => subject.id === subjectId) || null; }
