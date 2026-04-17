function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <label className="sr-only" htmlFor="phone-search">
        Search smartphone
      </label>

      <input
        id="phone-search"
        className="search-bar__input"
        type="search"
        placeholder="Search for a smartphone..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default SearchBar;
