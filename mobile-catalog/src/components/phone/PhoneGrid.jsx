import PhoneCard from './PhoneCard';

function PhoneGrid({ phones }) {
  return (
    <section className="phone-grid">
      {phones.map((phone, index) => (
        <PhoneCard key={`${phone.id}-${index}`} phone={phone} />
      ))}
    </section>
  );
}

export default PhoneGrid;
