import PhoneCard from './PhoneCard';

function SimilarProducts({ products }) {
  if (!products?.length) {
    return null;
  }

  return (
    <section className="similar-products">
      <h2 className="similar-products__title">SIMILAR ITEMS</h2>

      <div className="similar-products__grid">
        {products.map((product) => (
          <PhoneCard
            key={product.id}
            phone={product}
            className="similar-products__phone-card"
          />
        ))}
      </div>
    </section>
  );
}

export default SimilarProducts;