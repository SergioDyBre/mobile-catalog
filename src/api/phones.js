import { apiFetch } from './client';

export async function getPhones(search = '') {
  const query = search.trim();

  if (!query) {
    return apiFetch('/products');
  }

  return apiFetch(`/products?search=${encodeURIComponent(query)}`);
}

export async function getPhoneById(id) {
  return apiFetch(`/products/${id}`);
}
