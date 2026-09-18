import {
  Code2,
  Database,
  Globe,
  Cpu
} from 'lucide-react'

const icons = {
  Java: Code2,
  React: Globe,
  SQL: Database,
  Default: Cpu
}

function SubjectCard({ name, noteCount }) {
  const Icon = icons[name] || icons.Default

  return (
    <button className="subject-card">

      <div className="subject-icon">
        <Icon size={24} />
      </div>

      <div className="subject-info">
        <h3>{name}</h3>
        <span>{noteCount} notes</span>
      </div>

    </button>
  )
}

export default SubjectCard