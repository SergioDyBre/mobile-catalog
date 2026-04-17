export function formatPrice(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  })
    .format(value)
    .replace('€', 'EUR');
}

export function getSelectedPrice(basePrice, selectedStorage) {
  if (!selectedStorage) return basePrice;
  return selectedStorage.price;
}