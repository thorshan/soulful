const Item = require("../models/Items");

// Get all Items
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find()
      .populate("category", "name")
      .populate("brand", "name")
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error getting items", error });
  }
};

// Create Item
const createItem = async (req, res) => {
  try {
    const { name, category, brand, description, price, image, itemCode } =
      req.body;
    const item = await Item.create({
      name,
      category,
      brand,
      description,
      price,
      image,
      itemCode,
    });
    res.json({ message: "Item created successfully.", item });
  } catch (error) {
    res.status(500).json({ message: "Error creating items", error });
  }
};

// Update Item
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, brand, description, price, image, itemCode } =
      req.body;
    const existing = await Item.findById(id);
    if (!existing) return res.status(401).json({ message: "Item not found" });
    const updateData = {
      name,
      category,
      brand,
      description,
      price,
      image,
      itemCode,
    };
    const item = await Item.findByIdAndUpdate(id, updateData);
    res.json({ message: "Item updated successfully", item });
  } catch (error) {
    res.status(500).json({ message: "Error updating items", error });
  }
};

// Get item by Id
const getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate("category", "name")
      .populate("brand", "name");
    if (!item) return res.json({ message: "Item not found." });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Error getting item", error });
  }
};

// Delete item
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.json({ message: "Item not found." });
    await Item.findByIdAndDelete(item._id);
    res.json({ message: "Item deleted." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error });
  }
};

module.exports = {
  getAllItems,
  createItem,
  getItem,
  updateItem,
  deleteItem,
};
