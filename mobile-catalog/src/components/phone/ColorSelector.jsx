function ColorSelector({ options, selectedColor, onSelect }) {
  return (
    <fieldset className="detail-selector">
      <legend className="detail-selector__legend">Color. Pick your favourite.</legend>

      <div className="detail-selector__options">
        {options.map((option) => {
          const active = selectedColor?.name === option.name;

          return (
            <button
              key={option.name}
              type="button"
              className={`detail-selector__swatch ${active ? 'is-active' : ''}`}
              onClick={() => onSelect(option)}
              aria-label={option.name}
              aria-pressed={active}
              style={{ '--swatch-color': option.hexCode }}
            />
          );
        })}
      </div>
    </fieldset>
  );
}

export default ColorSelector;