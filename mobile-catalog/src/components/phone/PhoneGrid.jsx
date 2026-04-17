import PhoneCard from './PhoneCard';

function PhoneGrid({ phones }) {
  return (
    <section className="phone-grid" aria-label="Phone search results">
      {phones.map((phone) => (
        <PhoneCard key={phone.id} phone={phone} />
      ))}
    </section>
  );
}

export default PhoneGrid;
