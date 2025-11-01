const Item = require("../models/Item");
const Review = require("../models/Review");
const Promotion = require("../models/Promotion");
<<<<<<< HEAD
const Notification = require("../models/Notification");
=======
>>>>>>> 98e6164b887e97a6da26340894d2c511a366ddac

// Get all Items
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find()
      .populate("category", "name")
      .populate("brand", "name")
<<<<<<< HEAD
      .populate("createdBy", "name")
=======
      .populate("createdBy", "name email")
>>>>>>> 98e6164b887e97a6da26340894d2c511a366ddac
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error getting items", error });
  }
};

<<<<<<< HEAD
=======
// Get item by user
const getItemByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const items = await Item.find({ createdBy: id })
      .populate("category", "name")
      .populate("brand", "name")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error getting items", error });
  }
}

>>>>>>> 98e6164b887e97a6da26340894d2c511a366ddac
const getItemWithAllData = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate("category", "name")
      .populate("brand", "name")
      .populate("createdBy", "name email");
    if (!item) return res.json({ message: "Item not found." });
    const [reviews, promotions] = await Promise.all([
      Review.find({ item: item._id }),
<<<<<<< HEAD
      Promotion.find({ item: item._id }),
=======
      Promotion.find({ item: item._id })
>>>>>>> 98e6164b887e97a6da26340894d2c511a366ddac
    ]);
    res.json({ ...item.toObject(), reviews, promotions });
  } catch (error) {
    res.status(500).json({ message: "Error getting item", error });
  }
};

// Create Item
const createItem = async (req, res) => {
  try {
    const {
      name,
      category,
      brand,
      description,
      price,
      quantity,
      image,
      itemCode,
      createdBy,
    } = req.body;
    const item = await Item.create({
      name,
      category,
      brand,
      description,
      price,
      quantity,
      image,
      itemCode,
      createdBy,
    });
<<<<<<< HEAD

    // Admin notification
    const adminNotification = await Notification.create({
      message: `Item ー 「 ${name} 」  added.`,
      type: "alert",
      user: null,
    });

    res.json({
      message: "Item created successfully.",
      item,
      adminNotification,
    });
=======
    res.json({ message: "Item created successfully.", item });
>>>>>>> 98e6164b887e97a6da26340894d2c511a366ddac
  } catch (error) {
    res.status(500).json({ message: "Error creating items", error });
  }
};

// Update Item
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      category,
      brand,
      description,
      price,
      quantity,
      image,
      itemCode,
      createdBy,
    } = req.body;
    const existing = await Item.findById(id);
    if (!existing) return res.status(401).json({ message: "Item not found" });
    const updateData = {
      name,
      category,
      brand,
      description,
      price,
      quantity,
      image,
      itemCode,
      createdBy,
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
      .populate("brand", "name")
      .populate("createdBy", "name");
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
  getItemWithAllData,
<<<<<<< HEAD
=======
  getItemByUser,
>>>>>>> 98e6164b887e97a6da26340894d2c511a366ddac
};
