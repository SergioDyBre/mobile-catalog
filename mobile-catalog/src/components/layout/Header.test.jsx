import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import { CartProvider } from '../../context/CartContext';

function renderHeader() {
  return render(
    <CartProvider>
      <MemoryRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Header />
      </MemoryRouter>
    </CartProvider>
  );
}

describe('Header', () => {
  test('renders link to home page', () => {
    renderHeader();

    const homeLink = screen.getByRole('link', { name: /go to home page/i });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  test('renders link to cart page', () => {
    renderHeader();

    const cartLink = screen.getByRole('link', { name: /go to cart page/i });

    expect(cartLink).toBeInTheDocument();
    expect(cartLink).toHaveAttribute('href', '/cart');
  });

  test('shows empty cart count initially', () => {
    renderHeader();

    expect(screen.getByText('0')).toBeInTheDocument();
  });
});