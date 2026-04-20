const BASE_URL = 'https://prueba-tecnica-api-tienda-moviles.onrender.com';
const API_KEY = '87909682e6cd74208f41a6ef39fe4191';

export async function apiFetch(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'GET',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}
