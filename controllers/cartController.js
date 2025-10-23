const Cart = require("../models/Cart");

// Get all carts
const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find().populate("item", "name quantity price");
    res.json(carts);
  } catch (error) {
    res.json({ message: "Error getting data", error });
  }
};

// Get cart by Id
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id).populate(
      "item",
      "name quantity price"
    );
    if (!cart) res.json({ message: "Cart not found" });
    res.json(cart);
  } catch (error) {
    res.json({ message: "Error getting data", error });
  }
};

// Create cart
const createCart = async (req, res) => {
    try {
        const { item, quantity } = req.body;
        const cart = await Cart.create({ item, quantity});
        res.json({ message: "Cart created", cart });
        
    } catch (error) {
        res.json({ message: "Error creating cart", error });
    }
}

// update Cart
const updateCart = async (req, res) => {
    try {
        const { id } = req.params;
        const { item, quantity } = req.body;
        const updateData = { item, quantity };
        const cart = await Cart.findByIdAndUpdate(id, updateData);
        res.json({ message: "Cart updated", cart }); 
    } catch (error) {
        res.json({ message: "Error updating cart", error });
    }
}

// Delete cart
const deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        if(!cart) res.json({ message: "Cart not found" });
        await Cart.findByIdAndDelete(cart._id);
        res.json({ message: "Cart deleted." })
    } catch (error) {
        res.json({ message: "Error deleting cart", error });      
    }
}

module.exports = {
    getAllCarts,
    getCart,
    createCart,
    updateCart,
    deleteCart,
}