import { useMemo } from 'react';
import { formatPrice, getSelectedPrice } from '../../utils/formatPrice';
import ColorSelector from './ColorSelector';
import StorageSelector from './StorageSelector';
import SimilarProducts from './SimilarProducts';

function PhoneDetail({
  phone,
  selectedColor,
  selectedStorage,
  onSelectColor,
  onSelectStorage,
  onAddToCart,
}) {
  const currentImage = selectedColor?.imageUrl || phone.imageUrl;
  const currentPrice = getSelectedPrice(phone.basePrice, selectedStorage);
  const canAdd = Boolean(selectedColor && selectedStorage);

  const specRows = useMemo(
    () => [
      ['Brand', phone.brand],
      ['Name', phone.name],
      ['Description', phone.description],
      ['Screen', phone.specs?.screen],
      ['Resolution', phone.specs?.resolution],
      ['Processor', phone.specs?.processor],
      ['Main Camera', phone.specs?.mainCamera],
      ['Selfie Camera', phone.specs?.selfieCamera],
      ['Battery', phone.specs?.battery],
      ['OS', phone.specs?.os],
      ['Screen Refresh Rate', phone.specs?.screenRefreshRate],
    ],
    [phone]
  );

  return (
    <div className="phone-detail">
      <section className="phone-detail__hero">
        <div className="phone-detail__media">
          <img
            className="phone-detail__image"
            src={currentImage}
            alt={`${phone.brand} ${phone.name}`}
          />
        </div>

        <div className="phone-detail__panel">
          <p className="phone-detail__brand">{phone.brand}</p>
          <h1 className="phone-detail__name">{phone.name}</h1>
          <p className="phone-detail__price">From {formatPrice(currentPrice)}</p>

          <StorageSelector
            options={phone.storageOptions}
            selectedStorage={selectedStorage}
            onSelect={onSelectStorage}
          />

          <ColorSelector
            options={phone.colorOptions}
            selectedColor={selectedColor}
            onSelect={onSelectColor}
          />

          <button
            type="button"
            className="phone-detail__add"
            onClick={onAddToCart}
            disabled={!canAdd}
          >
            Añadir
          </button>
        </div>
      </section>

      <section className="specs">
        <h2 className="specs__title">SPECIFICATIONS</h2>

        <div className="specs__table" role="table" aria-label="Phone specifications">
          {specRows.map(([label, value]) => (
            <div className="specs__row" role="row" key={label}>
              <div className="specs__label" role="cell">
                {label}
              </div>
              <div className="specs__value" role="cell">
                {value}
              </div>
            </div>
          ))}
        </div>
      </section>

      <SimilarProducts products={phone.similarProducts || []} />
    </div>
  );
}

export default PhoneDetail;