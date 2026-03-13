import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Get the current user's cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate({
      path: "items.product",
      select: "name price imageUrl",
    });

    if (!cart) {
      return res.status(404).json({ items: [], message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("getCart error", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add an item to the cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [{ product: productId, quantity }],
      });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId,
    );
    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    const populatedCart = await cart.populate("items.product");
    res
      .status(201)
      .json({ message: "Item added to cart", cart: populatedCart });
  } catch (error) {
    console.error("addToCart error", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update the quantity of an item in the cart
export const updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId,
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }
    await cart.save();

    const populatedCart = await cart.populate("items.product");
    res.status(200).json({ message: "Cart item updated", cart: populatedCart });
  } catch (error) {
    console.error("updateCartItem error", error);
    res.status(500).json({ message: "Server error" });
  }
};

// remove an item from the cart
export const removeCartItem = async (req, res) => {
  const productId = req.params.productId || req.body?.productId;

  if (!productId) {
    return res.status(400).json({ message: "productId is required" });
  }

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const initialLength = cart.items.length;
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId,
    );

    if (cart.items.length === initialLength) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    await cart.save();

    const populatedCart = await cart.populate("items.product");
    res
      .status(200)
      .json({ message: "Item removed from cart", cart: populatedCart });
  } catch (error) {
    console.error("removeCartItem error", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Clear the cart
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    console.error("clearCart error", error);
    res.status(500).json({ message: "Server error" });
  }
};
