import { useState } from 'react';
import Header from '../components/layout/Header';
import SearchBar from '../components/layout/SearchBar';

function HomePage() {
  const [search, setSearch] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="home-page">
      <Header />

      <main className="home-page__content">
        <SearchBar value={search} onChange={handleSearchChange} />

        <section className="home-page__toolbar" aria-label="Search results information">
          <p className="home-page__results">0 RESULTS</p>
          <button type="button" className="home-page__filter-button">
            FILTER
          </button>
        </section>

        <section className="home-page__grid">
          <div className="home-page__placeholder-card">
            Product grid will go here
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;