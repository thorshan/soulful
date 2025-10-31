const Category = require("../models/Category");

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error getting categories.", error });
  }
};

// Create Category
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const existing = await Category.findOne({ name });
    if (existing) res.json({ message: "Category already exist." });
    const category = await Category.create({
      name, description
    });
    res.json({ message: "Category created successfully.", category });
  } catch (error) {
    res.status(500).json({ message: "Error creating category.", error });
  }
};

// Get Category by Id
const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) res.json({ message: "Category not found." });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Error getting Categorys.", error });
  }
};

// Update Category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updateData = { name, description };
    const category = await Category.findByIdAndUpdate(id, updateData);
    if (!category) res.json({ message: "Category not found" });
    res.json({ message: "Category upidated successfully", category });
  } catch (error) {
    res.status(500).json({ message: "Error updating Categorys.", error });
  }
};

// Delete Category
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) res.json({ message: "Category not found" });
    await Category.findByIdAndDelete(category._id);
    res.json({ message: "Category deleted." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Categorys.", error });
  }
};

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
