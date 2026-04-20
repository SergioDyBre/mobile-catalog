import { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import SearchBar from '../components/layout/SearchBar';
import PhoneGrid from '../components/phone/PhoneGrid';
import { getPhones } from '../api/phones';

function HomePage() {
  const [search, setSearch] = useState('');
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const loadPhones = async () => {
        try {
          setLoading(true);
          setError('');

          const data = await getPhones(search);
          setPhones(search.trim() ? data : data.slice(0, 20));
        } catch {
          setError('No se pudieron cargar los teléfonos.');
          setPhones([]);
        } finally {
          setLoading(false);
        }
      };

      loadPhones();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search]);

  return (
    <div className="home-page">
      <Header />

      <main className="home-page__content">
        <div className="home-page__wrapper">
          <SearchBar value={search} onChange={handleSearchChange} />

          <section
            className="home-page__toolbar"
            aria-label="Search results information"
          >
            <p className="home-page__results" role="status" aria-live="polite">
              {phones.length} RESULTS
            </p>
          </section>
        </div>

        {loading && (
          <p className="home-page__status" role="status" aria-live="polite">
            Loading phones...
          </p>
        )}

        {error && (
          <p
            className="home-page__status home-page__status--error"
            role="alert"
          >
            {error}
          </p>
        )}

        {!loading && !error && <PhoneGrid phones={phones} />}
      </main>
    </div>
  );
}

export default HomePage;
