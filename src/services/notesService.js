import subjects from "../data/subjects";

export const notesService = {
  getSubjects() {
    return subjects;
  },

  getSubject(subjectId) {
    return subjects.find((subject) => subject.id === subjectId);
  },

  getNote(subjectId, noteId) {
    const subject = this.getSubject(subjectId);

    if (!subject) {
      return null;
    }

    return subject.notes?.find((note) => note.id === noteId) || null;
  },

  getAllNotes() {
    return subjects.flatMap((subject) =>
      (subject.notes || []).map((note) => ({
        ...note,
        subjectId: subject.id,
        subjectName: subject.name,
      }))
    );
  },

  searchNotes(query) {
    const search = query.trim().toLowerCase();

    if (!search) {
      return this.getAllNotes();
    }

    return this.getAllNotes().filter((note) =>
      `${note.title} ${note.subjectName}`
        .toLowerCase()
        .includes(search)
    );
  },
};

export default notesService;