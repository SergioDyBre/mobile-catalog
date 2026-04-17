import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PhoneDetailPage from './PhoneDetailPage';
import { CartProvider } from '../context/CartContext';
import { getPhoneById } from '../api/phones';

jest.mock('../api/phones', () => ({
  getPhoneById: jest.fn(),
}));

jest.mock('../components/layout/Header', () => () => (
  <header>
    <div>Header mock</div>
  </header>
));

jest.mock('../components/phone/PhoneDetail', () => {
  return function MockPhoneDetail({
    phone,
    selectedColor,
    selectedStorage,
    onSelectColor,
    onSelectStorage,
    onAddToCart,
  }) {
    return (
      <div>
        <h1>{phone.name}</h1>
        <p>{phone.brand}</p>
        <p>{selectedColor?.name || 'No color'}</p>
        <p>{selectedStorage?.capacity || 'No storage'}</p>

        <button
          type="button"
          onClick={() => onSelectColor(phone.colorOptions[1])}
        >
          Change color
        </button>

        <button
          type="button"
          onClick={() => onSelectStorage(phone.storageOptions[1])}
        >
          Change storage
        </button>

        <button type="button" onClick={onAddToCart}>
          Add to cart
        </button>
      </div>
    );
  };
});

const phoneMock = {
  id: 'iphone-15',
  name: 'iPhone 15',
  brand: 'Apple',
  colorOptions: [
    {
      name: 'Black',
      hexCode: '#111111',
      imageUrl: '/iphone-black.jpg',
    },
    {
      name: 'Blue',
      hexCode: '#2233ff',
      imageUrl: '/iphone-blue.jpg',
    },
  ],
  storageOptions: [
    {
      capacity: '128 GB',
      price: 959,
    },
    {
      capacity: '256 GB',
      price: 1099,
    },
  ],
};

function renderPhoneDetailPage() {
  return render(
    <CartProvider>
      <MemoryRouter
        initialEntries={['/product/iphone-15']}
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/product/:id" element={<PhoneDetailPage />} />
        </Routes>
      </MemoryRouter>
    </CartProvider>
  );
}

describe('PhoneDetailPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getPhoneById.mockReset();
  });

  test('loads and renders the phone detail', async () => {
    getPhoneById.mockResolvedValue(phoneMock);

    renderPhoneDetailPage();

    expect(screen.getByText(/cargando producto/i)).toBeInTheDocument();

    expect(await screen.findByText('iPhone 15')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Black')).toBeInTheDocument();
    expect(screen.getByText('128 GB')).toBeInTheDocument();

    await waitFor(() => {
      expect(getPhoneById).toHaveBeenCalledWith('iphone-15');
    });
  });

  test('changes selected color and storage', async () => {
    getPhoneById.mockResolvedValue(phoneMock);

    renderPhoneDetailPage();

    await screen.findByText('iPhone 15');

    await userEvent.click(screen.getByRole('button', { name: /change color/i }));
    await userEvent.click(screen.getByRole('button', { name: /change storage/i }));

    expect(screen.getByText('Blue')).toBeInTheDocument();
    expect(screen.getByText('256 GB')).toBeInTheDocument();
  });

  test('adds the selected phone variant to cart', async () => {
    getPhoneById.mockResolvedValue(phoneMock);

    renderPhoneDetailPage();

    await screen.findByText('iPhone 15');

    await userEvent.click(screen.getByRole('button', { name: /change color/i }));
    await userEvent.click(screen.getByRole('button', { name: /change storage/i }));
    await userEvent.click(screen.getByRole('button', { name: /add to cart/i }));

    expect(screen.getByText('Blue')).toBeInTheDocument();
    expect(screen.getByText('256 GB')).toBeInTheDocument();
  });
});