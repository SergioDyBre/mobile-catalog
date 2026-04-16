import { apiFetch } from './client';

export async function getPhones() {
  return apiFetch('/products');
}

export async function getPhoneById(id) {
  return apiFetch(`/products/${id}`);
}