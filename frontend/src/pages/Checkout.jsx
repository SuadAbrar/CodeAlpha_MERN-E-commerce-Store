import { useContext, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { createOrder } from "../services/orderService";

const Checkout = () => {
  const { cart } = useCart();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!cart.length) {
      alert("Your cart is empty.");
      return;
    }
    setLoading(true);
    try {
      await createOrder(
        {
          items: cart.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
          })),
        },
        token,
      );
      alert("Order placed successfully!");
      navigate("/products");
    } catch (error) {
      console.error("Checkout failed:", error);
      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to place order. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Checkout</h2>
      <p className="mb-4">
        Total: $
        {cart
          .reduce(
            (total, item) => total + item.product.price * item.quantity,
            0,
          )
          .toFixed(2)}
      </p>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`w-full py-3 rounded-xl font-semibold transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-emerald-600 hover:bg-emerald-700 text-white"
        }`}
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
};

export default Checkout;
