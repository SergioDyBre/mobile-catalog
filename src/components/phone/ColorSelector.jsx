import { useState } from 'react';

function ColorSelector({ options, selectedColor, onSelect }) {
  const [hoveredColor, setHoveredColor] = useState(null);

  const visibleColorName = hoveredColor?.name || selectedColor?.name || '';

  return (
    <fieldset className="detail-selector">
      <legend className="detail-selector__legend">
        Color. Pick your favourite.
      </legend>

      <div className="detail-selector__options detail-selector__options--colors">
        {options.map((option) => {
          const active = selectedColor?.name === option.name;

          return (
            <button
              key={option.name}
              type="button"
              className={`detail-selector__swatch ${active ? 'is-active' : ''}`}
              onClick={() => onSelect(option)}
              onMouseEnter={() => setHoveredColor(option)}
              onMouseLeave={() => setHoveredColor(null)}
              onFocus={() => setHoveredColor(option)}
              onBlur={() => setHoveredColor(null)}
              aria-label={`Color ${option.name}`}
              aria-pressed={active}
              style={{ '--swatch-color': option.hexCode }}
            />
          );
        })}
      </div>

      <p className="detail-selector__color-name">{visibleColorName}</p>
    </fieldset>
  );
}

export default ColorSelector;
