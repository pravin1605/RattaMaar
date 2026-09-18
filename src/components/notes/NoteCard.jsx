import { ChevronRight, FileText } from 'lucide-react'

function NoteCard({ title, category, description }) {
  return (
    <button className="note-card">

      <div className="note-icon">
        <FileText size={22} />
      </div>

      <div className="note-content">

        <span className="note-category">
          {category}
        </span>

        <h3>{title}</h3>

        <p>{description}</p>

      </div>

      <ChevronRight size={20} className="note-arrow" />

    </button>
  )
}

export default NoteCard