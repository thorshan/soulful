const Brand = require("../models/Brand");
<<<<<<< HEAD
const Notification = require("../models/Notification");
=======
>>>>>>> 98e6164b887e97a6da26340894d2c511a366ddac

// Get all user
const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find()
      .populate("incharge", "name")
      .populate("category", "name")
      .sort({ createdAt: -1 });
    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: "Error getting brands.", error });
  }
};

// Create brand
const createBrand = async (req, res) => {
  try {
<<<<<<< HEAD
    const { name, image, title, contact, address, incharge, category } =
      req.body;
=======
    const { name, image, title, contact, address, incharge, category } = req.body;
>>>>>>> 98e6164b887e97a6da26340894d2c511a366ddac
    const existing = await Brand.findOne({ name });
    if (existing) res.json({ message: "Brand already exist." });
    const brand = await Brand.create({
      name,
      image,
      title,
      contact,
      address,
      incharge,
      category,
    });
<<<<<<< HEAD

    // Admin notification
    const adminNotification = await Notification.create({
      message: `Brand ー 「 ${name} 」  created.`,
      type: "system",
      user: null,
    });

    res.json({
      message: "Brand created successfully.",
      brand,
      adminNotification,
    });
=======
    res.json({ message: "Brand created successfully.", brand });
>>>>>>> 98e6164b887e97a6da26340894d2c511a366ddac
  } catch (error) {
    res.status(500).json({ message: "Error creating brand.", error });
  }
};

// Get brand by Id
const getBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id)
      .populate("incharge", "name")
      .populate("category", "name");
    if (!brand) res.json({ message: "Brand not found." });
    res.json(brand);
  } catch (error) {
    res.status(500).json({ message: "Error getting brands.", error });
  }
};

// Update brand
const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
<<<<<<< HEAD
    const { name, image, title, contact, address, incharge, category } =
      req.body;
    const updateData = {
      name,
      image,
      title,
      contact,
      address,
      incharge,
      category,
    };
=======
    const { name, image, title, contact, address, incharge, category } = req.body;
    const updateData = { name, image, title, contact, address, incharge, category };
>>>>>>> 98e6164b887e97a6da26340894d2c511a366ddac
    const brand = await Brand.findByIdAndUpdate(id, updateData);
    if (!brand) res.json({ message: "Brand not found" });
    res.json({ message: "Brand upidated successfully", brand });
  } catch (error) {
    res.status(500).json({ message: "Error updating brands.", error });
  }
};

// Delete brand
const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) res.json({ message: "Brand not found" });
    await Brand.findByIdAndDelete(brand._id);
    res.json({ message: "Brand deleted." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting brands.", error });
  }
};

module.exports = {
  getAllBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
};
