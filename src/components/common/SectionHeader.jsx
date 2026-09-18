import { Search } from 'lucide-react'

function SearchBar() {
  return (
    <div className="search-container">
      <Search size={20} />

      <input
        type="search"
        placeholder="Search your notes..."
        aria-label="Search your notes"
      />
    </div>
  )
}

export default SearchBar