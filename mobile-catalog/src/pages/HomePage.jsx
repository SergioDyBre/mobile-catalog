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
    const loadPhones = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getPhones();
        setPhones(data.slice(0, 20));
      } catch (err) {
        setError('No se pudieron cargar los teléfonos.');
      } finally {
        setLoading(false);
      }
    };

    loadPhones();
  }, []);

  return (
    <div className="home-page">
      <Header />

      <main className="home-page__content">
        <SearchBar value={search} onChange={handleSearchChange} />

        <section className="home-page__toolbar" aria-label="Search results information">
          <p className="home-page__results">{phones.length} RESULTS</p>
          <button type="button" className="home-page__filter-button">
            FILTER
          </button>
        </section>

        {loading && <p className="home-page__status">Loading phones...</p>}
        {error && <p className="home-page__status home-page__status--error">{error}</p>}

        {!loading && !error && <PhoneGrid phones={phones} />}
      </main>
    </div>
  );
}

export default HomePage;