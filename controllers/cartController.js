const Cart = require("../models/Cart");
// const Item = require("../models/Item");

// Get cart by user
const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ user: userId }).populate("items.item");
    if (!cart) return res.json({ items: [] });

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error getting cart", error });
  }
};

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // create new cart if none exists
      cart = new Cart({ user: userId, items: [{ item: itemId, quantity }] });
    } else {
      // check if item already exists in cart
      const itemIndex = cart.items.findIndex(
        (i) => i.item.toString() === itemId
      );

      if (itemIndex > -1) {
        // update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // push new item
        cart.items.push({ item: itemId, quantity });
      }
    }

    await cart.save();
    const updatedCart = await cart.populate("items.item");
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
};

// Update quantity
const updateQuantity = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (i) => i.item.toString() === itemId
    );

    if (itemIndex === -1)
      return res.status(404).json({ message: "Item not in cart" });

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    const updatedCart = await cart.populate("items.item");
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: "Error updating quantity", error });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((i) => i.item.toString() !== itemId);
    await cart.save();

    const updatedCart = await cart.populate("items.item");
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: "Error removing item", error });
  }
};

// Clear cart
const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { items: [] },
      { new: true }
    );

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error });
  }
};

module.exports = {
  getCart,
  updateQuantity,
  addToCart,
  removeFromCart,
  clearCart,
}