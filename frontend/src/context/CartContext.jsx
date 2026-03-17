import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
} from "../services/cartService";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    if (!token) return;
    try {
      const cartData = await getCart(token);
      setCart(cartData.items || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  const addItem = async (productId) => {
    try {
      const response = await addToCart(productId, 1, token);
      setCart(response.items || []);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const updateItem = async (productId, quantity) => {
    try {
      const response = await updateCartItem(productId, quantity, token);
      setCart(response.items || []);
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const removeItem = async (productId) => {
    try {
      const response = await removeFromCart(productId);
      setCart(response.items || []);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addItem, updateItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};
