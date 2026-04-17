import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import PhoneDetail from '../components/phone/PhoneDetail';
import { getPhoneById } from '../api/phones';
import { useCart } from '../context/CartContext';

function PhoneDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [phone, setPhone] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPhone = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getPhoneById(id);
        setPhone(data);
        setSelectedColor(data.colorOptions?.[0] || null);
        setSelectedStorage(data.storageOptions?.[0] || null);
      } catch (err) {
        setError('No se pudo cargar el producto.');
      } finally {
        setLoading(false);
      }
    };

    loadPhone();
  }, [id]);

  const handleAddToCart = () => {
    if (!phone || !selectedColor || !selectedStorage) return;

    addToCart({
      id: `${phone.id}-${selectedColor.name}-${selectedStorage.capacity}`,
      phoneId: phone.id,
      name: phone.name,
      brand: phone.brand,
      imageUrl: selectedColor.imageUrl,
      colorName: selectedColor.name,
      colorHex: selectedColor.hexCode,
      storageLabel: selectedStorage.capacity,
      price: selectedStorage.price,
    });
  };

  return (
    <div className="detail-page">
      <Header />

      <main className="detail-page__content">
        {loading && (
          <p className="detail-page__message">Cargando producto...</p>
        )}

        {error && (
          <p className="detail-page__message detail-page__message--error">
            {error}
          </p>
        )}

        {!loading && !error && phone && (
          <PhoneDetail
            phone={phone}
            selectedColor={selectedColor}
            selectedStorage={selectedStorage}
            onSelectColor={setSelectedColor}
            onSelectStorage={setSelectedStorage}
            onAddToCart={handleAddToCart}
          />
        )}
      </main>
    </div>
  );
}

export default PhoneDetailPage;