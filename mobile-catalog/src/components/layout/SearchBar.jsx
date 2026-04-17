function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <input
        id="phone-search"
        className="search-bar__input"
        type="search"
        placeholder="Search for a smartphone..."
        aria-label="Search smartphones by name or brand"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default SearchBar;