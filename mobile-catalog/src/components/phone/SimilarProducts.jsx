import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';

function SimilarProducts({ products }) {
  return (
    <section className="similar-products">
      <h2 className="similar-products__title">SIMILAR ITEMS</h2>

      <div className="similar-products__grid">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="similar-products__card"
          >
            <div className="similar-products__media">
              <img
                className="similar-products__image"
                src={product.imageUrl}
                alt={`${product.brand} ${product.name}`}
              />
            </div>

            <div className="similar-products__meta">
              <p className="similar-products__brand">{product.brand}</p>
              <h3 className="similar-products__name">{product.name}</h3>
              <p className="similar-products__price">{formatPrice(product.basePrice)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default SimilarProducts;