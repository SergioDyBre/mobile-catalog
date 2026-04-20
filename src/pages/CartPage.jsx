import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import CartItem from '../components/cart/CartItem';
import { useCart } from '../context/CartContext';

function CartPage() {
  const { cartItems, cartCount, cartTotal, removeFromCart } = useCart();

  const handlePay = () => {
    window.alert(`Total a pagar: ${cartTotal} EUR`);
  };

  return (
    <div className="cart-page">
      <Header />

      <main className="cart-page__content">
        <h1 className="cart-page__title">CART ({cartCount})</h1>

        {cartItems.length === 0 ? (
          <section className="cart-page__empty">
            <Link to="/" className="cart-page__continue">
              CONTINUE SHOPPING
            </Link>
          </section>
        ) : (
          <section className="cart-page__body">
            <div className="cart-page__items">
              {cartItems.map((item) => (
                <CartItem
                  key={item.lineId}
                  item={item}
                  onRemove={removeFromCart}
                />
              ))}
            </div>

            <div className="cart-page__footer">
              <div className="cart-page__summary">
                <p className="cart-page__total-label">TOTAL</p>
                <p className="cart-page__total-value">{cartTotal} EUR</p>
              </div>

              <div className="cart-page__actions">
                <Link to="/" className="cart-page__continue">
                  CONTINUE SHOPPING
                </Link>

                <button
                  type="button"
                  className="cart-page__pay"
                  onClick={handlePay}
                >
                  PAY
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default CartPage;
