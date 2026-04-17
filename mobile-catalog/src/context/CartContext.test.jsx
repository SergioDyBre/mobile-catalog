import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider, useCart } from './CartContext';

function CartConsumerTest() {
  const { cartItems, cartCount, cartTotal, addToCart, removeFromCart, clearCart } =
    useCart();

  const testItem = {
    id: 'SMG-S24U-Titanium-Violet-256GB',
    phoneId: 'SMG-S24U',
    name: 'Galaxy S24 Ultra',
    brand: 'Samsung',
    imageUrl: '/test-image.jpg',
    colorName: 'Titanium Violet',
    colorHex: '#635b73',
    storageLabel: '256 GB',
    price: 1459,
  };

  return (
    <div>
      <p data-testid="cart-count">{cartCount}</p>
      <p data-testid="cart-items-length">{cartItems.length}</p>
      <p data-testid="cart-total">{cartTotal}</p>

      <button type="button" onClick={() => addToCart(testItem)}>
        Add item
      </button>

      <button type="button" onClick={clearCart}>
        Clear cart
      </button>

      {cartItems.map((item) => (
        <button
          key={item.lineId}
          type="button"
          onClick={() => removeFromCart(item.lineId)}
        >
          Remove {item.lineId}
        </button>
      ))}
    </div>
  );
}

describe('CartContext', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('starts with an empty cart', () => {
    render(
      <CartProvider>
        <CartConsumerTest />
      </CartProvider>
    );

    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-items-length')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0');
  });

  test('adds items as separate line items', () => {
    render(
      <CartProvider>
        <CartConsumerTest />
      </CartProvider>
    );

    const addButton = screen.getByRole('button', { name: /add item/i });

    userEvent.click(addButton);
    userEvent.click(addButton);

    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
    expect(screen.getByTestId('cart-items-length')).toHaveTextContent('2');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('2918');
  });

  test('removes only one line item', () => {
    render(
      <CartProvider>
        <CartConsumerTest />
      </CartProvider>
    );

    const addButton = screen.getByRole('button', { name: /add item/i });

    userEvent.click(addButton);
    userEvent.click(addButton);

    const removeButtons = screen.getAllByRole('button', { name: /remove/i });
    expect(removeButtons).toHaveLength(2);

    userEvent.click(removeButtons[0]);

    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(screen.getByTestId('cart-items-length')).toHaveTextContent('1');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('1459');
  });

  test('clears the cart', () => {
    render(
      <CartProvider>
        <CartConsumerTest />
      </CartProvider>
    );

    userEvent.click(screen.getByRole('button', { name: /add item/i }));
    userEvent.click(screen.getByRole('button', { name: /clear cart/i }));

    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-items-length')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0');
  });

  test('persists cart data in localStorage', async () => {
    render(
      <CartProvider>
        <CartConsumerTest />
      </CartProvider>
    );

    userEvent.click(screen.getByRole('button', { name: /add item/i }));

    await waitFor(() => {
      const storedCart = JSON.parse(
        window.localStorage.getItem('mbst-cart') || '[]'
      );

      expect(storedCart).toHaveLength(1);
      expect(storedCart[0].name).toBe('Galaxy S24 Ultra');
    });
  });
});