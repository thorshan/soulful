const Promotion = require("../models/Promotion");

// Get all promos
const getAllPromos = async (req, res) => {
  try {
    const promotios = await Promotion.find().sort({ createdAt: -1 });
    res.json(promotios);
  } catch (error) {
    res.status(500).json({ message: "Error getting promotions", error });
  }
};

// Create promo
const createPromo = async (req, res) => {
  try {
    const { title, description, promoCode, promoPrice } = req.body;
    const promo = await Promotion.create({
      title,
      description,
      promoCode,
      promoPrice,
    });
    res.json({ message: "Promotion created", promo });
  } catch (error) {
    res.status(500).json({ message: "Error creating promotion", error });
  }
};

// Get promo by Id
const getPromo = async (req, res) => {
  try {
    const promo = await Promotion.findById(req.params.id);
    if (!promo) res.json({ message: "Promotion not found" });
    res.json(promo);
  } catch (error) {
    res.status(500).json({ message: "Error getting promotion", error });
  }
};

// Update promo
const updatePromo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, promoCode, promoPrice } = req.body;
    const existing = await Promotion.findById(id);
    if (!existing) return res.json({ message: "Promotion not found" });
    const updateData = { title, description, promoCode, promoPrice };
    const promo = await Promotion.findByIdAndUpdate(id, updateData);
    res.json({ message: "Promotion created.", promo });
  } catch (error) {
    res.status(500).json({ message: "Error updating promotion", error });
  }
};

// Delete promo
const deletePromo = async (req, res) => {
  try {
    const promo = await Promotion.findById(req.params.id);
    if (!promo) res.json({ message: "Promotion not found" });
    await Promotion.findByIdAndDelete(promo._id);
    res.json({ message: "Item deleted." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting promotion", error });
  }
};

module.exports = {
  getAllPromos,
  getPromo,
  createPromo,
  updatePromo,
  deletePromo,
};
