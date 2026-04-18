import PhoneCard from './PhoneCard';

function PhoneGrid({ phones }) {
  return (
    <section className="phone-grid" aria-label="Phone search results">
      {phones.map((phone, index) => (
        <PhoneCard
          key={`${phone.id}-${phone.brand}-${phone.name}-${index}`}
          phone={phone}
        />
      ))}
    </section>
  );
}

export default PhoneGrid;
