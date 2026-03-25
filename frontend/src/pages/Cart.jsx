import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, updateItem, removeItem } = useCart();

  if (!cart.length) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="mb-6 text-7xl">🛒</div>
        <h2 className="text-3xl font-bold text-gray-800">Your cart is empty</h2>
        <p className="text-gray-600 mt-2 mb-6 max-w-md">
          Add products to your cart to start checkout and receive attractive
          offers.
        </p>
        <Link
          to="/products"
          className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Your Cart</h1>

      {cart.map((item) => (
        <div
          key={item.product._id}
          className="bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {item.product.name}
            </h2>
            <p className="text-sm text-gray-600">
              ${item.product.price.toFixed(2)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                updateItem(item.product._id, Math.max(1, item.quantity - 1))
              }
              className="w-8 h-8 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition"
            >
              -
            </button>

            <span className="min-w-[28px] text-center font-medium">
              {item.quantity}
            </span>

            <button
              onClick={() => updateItem(item.product._id, item.quantity + 1)}
              className="w-8 h-8 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition"
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => removeItem(item.product._id)}
              className="text-white bg-rose-500 hover:bg-rose-600 px-3 py-1.5 rounded-lg text-sm transition"
            >
              Remove
            </button>
            <span className="text-sm text-gray-600">
              Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
            </span>
          </div>
        </div>
      ))}
      <Link
        to="/checkout"
        className="w-full block text-center bg-emerald-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-emerald-700 transition"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default Cart;
