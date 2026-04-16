import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function Header() {
  const { cartCount } = useCart();

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <Link to="/" className="app-header__logo" aria-label="Go to home page">
          <span>MBST</span>
        </Link>

        <Link to="/cart" className="app-header__cart" aria-label="Go to cart page">
          <span className="app-header__cart-icon">🛍</span>
          <span className="app-header__cart-count">{cartCount}</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;