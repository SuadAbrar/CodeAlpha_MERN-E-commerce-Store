import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../services/orderService";
import { AuthContext } from "../context/AuthContext";

const Orders = () => {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const ordersData = await getOrders(token);
        setOrders(ordersData.orders || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token]);

  if (loading) {
    return <div className="text-center py-10">Loading orders...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="mb-6 text-7xl">📦</div>
        <h2 className="text-3xl font-bold text-gray-800">No orders yet</h2>
        <p className="text-gray-600 mt-2 mb-6 max-w-md">
          Your orders will appear here once you place them. Start shopping now!
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">My Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="border rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-gray-700">
                Order ID: {order._id}
              </p>
              <span className="text-sm text-gray-500">
                {formatDate(order.createdAt)}
              </span>
            </div>
            <p className="text-sm text-emerald-700 mb-3">
              Status: {order.orderStatus}
            </p>

            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.product._id} className="flex justify-between">
                  <span>{item.product.name}</span>
                  <span>
                    {item.quantity} × ${item.product.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
