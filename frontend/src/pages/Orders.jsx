import { useContext, useEffect, useState } from "react";
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
    return <div className="text-center py-10">You have no orders yet.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">My Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="border rounded-xl p-4 mb-4">
            <p className="font-semibold mb-2">Order ID: {order._id}</p>

            {order.items.map((item) => (
              <div key={item.product._id} className="flex justify-between">
                <span>{item.product.name}</span>
                <span>
                  {item.quantity} × ${item.product.price}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
