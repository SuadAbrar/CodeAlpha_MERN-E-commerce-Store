import api from "./api";

export const addToCart = async (productId, quantity, token) => {
  try {
    const response = await api.post(
      "/cart",
      { productId, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const getCart = async (token) => {
  try {
    const response = await api.get("/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

export const updateCartItem = async (productId, quantity, token) => {
  try {
    const response = await api.put(
      `/cart/${productId}`,
      { quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw error;
  }
};

export const removeFromCart = async (productId, token) => {
  try {
    const response = await api.delete(`/cart/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
};
