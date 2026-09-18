import './Header.css'

function Header() {
  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="header-logo">
          <span className="header-logo-icon">▤</span>
        </div>

        <div className="header-title">
          <h1>Notes Web</h1>
          <span>Learn. Read. Remember.</span>
        </div>
      </div>

      <button
        className="header-search-btn"
        aria-label="Search notes"
      >
        <span className="header-search-icon">⌕</span>
      </button>
    </header>
  )
}

export default Header