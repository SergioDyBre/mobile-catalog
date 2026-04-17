import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';
import { CartProvider } from '../context/CartContext';
import * as phoneApi from '../api/phones';

jest.mock('../api/phones');

const phonesMock = [
  {
    id: 'iphone-15',
    name: 'iPhone 15',
    brand: 'Apple',
    basePrice: 959,
    imageUrl: '/iphone15.jpg',
  },
  {
    id: 'galaxy-s24',
    name: 'Galaxy S24',
    brand: 'Samsung',
    basePrice: 899,
    imageUrl: '/galaxy-s24.jpg',
  },
  {
    id: 'pixel-8',
    name: 'Pixel 8',
    brand: 'Google',
    basePrice: 799,
    imageUrl: '/pixel-8.jpg',
  },
];

function renderHomePage() {
  return render(
    <CartProvider>
      <MemoryRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <HomePage />
      </MemoryRouter>
    </CartProvider>
  );
}

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    phoneApi.getPhones.mockReset();
  });

  test('renders phones from API on load', async () => {
    phoneApi.getPhones.mockResolvedValue(phonesMock);

    renderHomePage();

    await waitFor(() => {
      expect(phoneApi.getPhones).toHaveBeenCalledTimes(1);
    });

    expect(await screen.findByText('iPhone 15')).toBeInTheDocument();
    expect(screen.getByText('Galaxy S24')).toBeInTheDocument();
    expect(screen.getByText('Pixel 8')).toBeInTheDocument();
  });

  test('shows result count after loading phones', async () => {
    phoneApi.getPhones.mockResolvedValue(phonesMock);

    renderHomePage();

    await screen.findByText('iPhone 15');

    expect(screen.getByText(/3\s*results/i)).toBeInTheDocument();
  });

  test('searches phones by API when typing in the search box', async () => {
    phoneApi.getPhones
      .mockResolvedValueOnce(phonesMock)
      .mockResolvedValueOnce([
        {
          id: 'galaxy-s24',
          name: 'Galaxy S24',
          brand: 'Samsung',
          basePrice: 899,
          imageUrl: '/galaxy-s24.jpg',
        },
      ]);

    renderHomePage();

    await screen.findByText('iPhone 15');

    const searchInput = screen.getByRole('searchbox', {
      name: /search smartphone/i,
    });

    await userEvent.type(searchInput, 'samsung');

    await waitFor(() => {
      expect(phoneApi.getPhones).toHaveBeenCalledTimes(2);
    });

    expect(phoneApi.getPhones).toHaveBeenLastCalledWith('samsung');
    expect(await screen.findByText('Galaxy S24')).toBeInTheDocument();
    expect(screen.queryByText('iPhone 15')).not.toBeInTheDocument();
    expect(screen.queryByText('Pixel 8')).not.toBeInTheDocument();
    expect(screen.getByText(/1\s*results?/i)).toBeInTheDocument();
  });

  test('renders links to the phone detail page', async () => {
    phoneApi.getPhones.mockResolvedValue(phonesMock);

    renderHomePage();

    const detailLink = await screen.findByRole('link', {
      name: /apple iphone 15/i,
    });

    expect(detailLink).toHaveAttribute(
      'href',
      expect.stringContaining('/product/iphone-15')
    );
  });
});