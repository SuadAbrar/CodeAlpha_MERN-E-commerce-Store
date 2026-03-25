import { createContext, useContext, useState, useEffect } from "react";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
} from "../services/cartService";
import { AuthContext } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    if (!token) return;
    try {
      const data = await getCart(token);
      setCart(data.items || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  const addItem = async (productId, quantity = 1) => {
    if (!token) {
      throw new Error("You must be logged in to add items to the cart.");
    }
    try {
      const data = await addToCart(productId, quantity, token);
      setCart(data.cart.items || []);
      return data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  };

  const updateItem = async (productId, quantity) => {
    if (!token) {
      throw new Error("You must be logged in to update your cart.");
    }
    try {
      const data = await updateCartItem(productId, quantity, token);
      setCart(data.cart.items || []);
      return data;
    } catch (error) {
      console.error("Error updating cart item:", error);
      throw error;
    }
  };

  const removeItem = async (productId) => {
    if (!token) {
      throw new Error("You must be logged in to remove items from cart.");
    }
    try {
      const data = await removeFromCart(productId, token);
      setCart(data.cart.items || []);
      return data;
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error;
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addItem, updateItem, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
