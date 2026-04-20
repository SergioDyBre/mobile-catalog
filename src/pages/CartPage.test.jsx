import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import CartPage from './CartPage';
import { CartProvider } from '../context/CartContext';

jest.mock('../components/layout/Header', () => () => (
  <header>
    <div>Header mock</div>
  </header>
));

jest.mock('../components/cart/CartItem', () => {
  return function MockCartItem({ item, onRemove }) {
    return (
      <div>
        <p>{item.name}</p>
        <p>{item.storageLabel}</p>
        <p>{item.price} EUR</p>
        <button type="button" onClick={() => onRemove(item.lineId)}>
          Remove {item.lineId}
        </button>
      </div>
    );
  };
});

const cartItemsMock = [
  {
    lineId: 'line-1',
    id: 'iphone-15-black-128',
    phoneId: 'iphone-15',
    name: 'iPhone 15',
    brand: 'Apple',
    imageUrl: '/iphone-black.jpg',
    colorName: 'Black',
    colorHex: '#111111',
    storageLabel: '128 GB',
    price: 959,
  },
  {
    lineId: 'line-2',
    id: 'galaxy-s24-blue-256',
    phoneId: 'galaxy-s24',
    name: 'Galaxy S24',
    brand: 'Samsung',
    imageUrl: '/galaxy-blue.jpg',
    colorName: 'Blue',
    colorHex: '#2233ff',
    storageLabel: '256 GB',
    price: 899,
  },
];

function renderCartPageWithStorage(items = []) {
  window.localStorage.setItem('mbst-cart', JSON.stringify(items));

  return render(
    <CartProvider>
      <MemoryRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <CartPage />
      </MemoryRouter>
    </CartProvider>
  );
}

describe('CartPage', () => {
  beforeEach(() => {
    window.localStorage.clear();
    jest.clearAllMocks();
  });

  test('renders empty cart state', () => {
    renderCartPageWithStorage();

    expect(
      screen.getByRole('heading', { name: /cart \(0\)/i })
    ).toBeInTheDocument();

    const continueLink = screen.getByRole('link', {
      name: /continue shopping/i,
    });

    expect(continueLink).toBeInTheDocument();
    expect(continueLink).toHaveAttribute('href', '/');
  });

  test('renders cart items and total', () => {
    renderCartPageWithStorage(cartItemsMock);

    expect(
      screen.getByRole('heading', { name: /cart \(2\)/i })
    ).toBeInTheDocument();

    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    expect(screen.getByText('Galaxy S24')).toBeInTheDocument();
    expect(screen.getByText('1858 EUR')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /pay/i })).toBeInTheDocument();
  });

  test('removes one cart item', async () => {
    renderCartPageWithStorage(cartItemsMock);

    expect(
      screen.getByRole('heading', { name: /cart \(2\)/i })
    ).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole('button', { name: /remove line-1/i })
    );

    expect(
      screen.getByRole('heading', { name: /cart \(1\)/i })
    ).toBeInTheDocument();

    expect(screen.queryByText('iPhone 15')).not.toBeInTheDocument();
    expect(screen.getByText('Galaxy S24')).toBeInTheDocument();

    const summary = screen.getByText(/total/i).closest('.cart-page__summary');
    expect(summary).not.toBeNull();
    expect(within(summary).getByText('899 EUR')).toBeInTheDocument();
  });

  test('shows alert with total when clicking pay', async () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    renderCartPageWithStorage(cartItemsMock);

    await userEvent.click(screen.getByRole('button', { name: /pay/i }));

    expect(alertSpy).toHaveBeenCalledWith('Total a pagar: 1858 EUR');

    alertSpy.mockRestore();
  });
});
