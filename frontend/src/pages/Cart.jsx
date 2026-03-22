import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, updateItem, removeItem } = useCart();

  if (!cart.length) {
    return <div className="p-10 text-center">Your cart is empty</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.map((item) => (
        <div
          key={item.product._id}
          className="flex items-center justify-between border-b py-4"
        >
          <div>
            <h2>{item.product.name}</h2>
            <p>${item.product.price}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => updateItem(item.product._id, item.quantity - 1)}
            >
              -
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() => updateItem(item.product._id, item.quantity + 1)}
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeItem(item.product._id)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
