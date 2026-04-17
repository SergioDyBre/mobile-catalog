function StorageSelector({ options, selectedStorage, onSelect }) {
  return (
    <fieldset className="detail-selector">
      <legend className="detail-selector__legend">
        Storage. How much space do you need?
      </legend>

      <div className="detail-selector__options detail-selector__options--storage">
        {options.map((option) => {
          const active = selectedStorage?.capacity === option.capacity;

          return (
            <button
              key={option.capacity}
              type="button"
              className={`detail-selector__chip ${active ? 'is-active' : ''}`}
              onClick={() => onSelect(option)}
              aria-pressed={active}
            >
              {option.capacity}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export default StorageSelector;
