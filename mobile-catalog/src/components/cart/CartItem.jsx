function CartItem({ item, onRemove }) {
  return (
    <article className="cart-item">
      <div className="cart-item__media">
        <img
          className="cart-item__image"
          src={item.imageUrl}
          alt={`${item.brand} ${item.name}`}
        />
      </div>

      <div className="cart-item__content">
        <h2 className="cart-item__name">{item.name}</h2>

        <p className="cart-item__variant">
          {item.storageLabel} | {item.colorName}
        </p>

        <p className="cart-item__price">{item.price} EUR</p>
      </div>

      <button
        type="button"
        className="cart-item__remove"
        onClick={() => onRemove(item.lineId)}
        aria-label={`Eliminar ${item.brand} ${item.name} del carrito`}
      >
        Eliminar
      </button>
    </article>
  );
}

export default CartItem;
