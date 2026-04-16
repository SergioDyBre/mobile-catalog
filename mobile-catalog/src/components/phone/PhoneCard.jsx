import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';

function PhoneCard({ phone }) {
  return (
    <article className="phone-card">
      <Link to={`/product/${phone.id}`} className="phone-card__link">
        <div className="phone-card__image-wrapper">
          <img
            className="phone-card__image"
            src={phone.imageUrl}
            alt={`${phone.brand} ${phone.name}`}
          />
        </div>

        <div className="phone-card__info">
          <div className="phone-card__meta">
            <p className="phone-card__brand">{phone.brand}</p>
            <p className="phone-card__price">{formatPrice(phone.basePrice)}</p>
          </div>

          <h2 className="phone-card__name">{phone.name}</h2>
        </div>
      </Link>
    </article>
  );
}

export default PhoneCard;