import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import cartActiveIcon from '../../assets/State=Active.svg';
import cartInactiveIcon from '../../assets/State=Inactive.svg';

function Header() {
  const { cartCount } = useCart();
  const cartIcon = cartCount > 0 ? cartActiveIcon : cartInactiveIcon;

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <Link to="/" className="app-header__logo" aria-label="Go to home page">
          <span>MBST</span>
        </Link>

        <Link
          to="/cart"
          className="app-header__cart"
          aria-label={`Go to cart page, ${cartCount} items`}
        >
          <img
            src={cartIcon}
            alt=""
            aria-hidden="true"
            className="app-header__cart-icon"
          />
          <span className="app-header__cart-count">{cartCount}</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
