export function formatPrice(value) {
  return `${new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)} EUR`;
}

export function getSelectedPrice(basePrice, selectedStorage) {
  if (!selectedStorage) return basePrice;
  return selectedStorage.price;
}
