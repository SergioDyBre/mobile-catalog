import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';

function PhoneCard({ phone, className = '' }) {
  return (
    <article className={`phone-card ${className}`.trim()}>
      <Link to={`/product/${phone.id}`} className="phone-card__link">
        <div className="phone-card__image-wrapper">
          <img
            className="phone-card__image"
            src={phone.imageUrl}
            alt={`${phone.brand} ${phone.name}`}
          />
        </div>

        <div className="phone-card__info">
          <p className="phone-card__brand">{phone.brand}</p>

          <div className="phone-card__title-row">
            <h2 className="phone-card__name">{phone.name}</h2>
            <p className="phone-card__price">{formatPrice(phone.basePrice)}</p>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default PhoneCard;