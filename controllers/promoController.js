const Promotion = require("../models/Promotion");
const Item = require("../models/Item");

// Get all promos
const getAllPromos = async (req, res) => {
  try {
    const promotions = await Promotion.find()
    .populate("item", "name itemCode price")
    .sort({ createdAt: -1 });
    res.json(promotions);
  } catch (error) {
    res.status(500).json({ message: "Error getting promotions", error });
  }
};

// Create promo
const createPromo = async (req, res) => {
  try {
    const { item, title, promoCode, discount, expiryDate } = req.body;
    const existing = await Item.findById(item);
    if(!existing) res.json({ message: "Item not found" });
    const promo = await Promotion.create({
      item, title, promoCode, discount, expiryDate
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

// Get promo by Item
const getPromoByItem = async (req, res) => {
  try {
    const { id } = req.params;
    const promos = await Promotion.find({ item: id })
    .populate("item", "name itemCode price");
    res.json(promos);
  } catch (error) {
    res.status(500).json({ message: "Error getting promotion", error });
  }
};

// Update promo
const updatePromo = async (req, res) => {
  try {
    const { id } = req.params;
    const { item, title, promoCode, discount, expiryDate } = req.body;
    const existing = await Promotion.findById(id);
    if (!existing) return res.json({ message: "Promotion not found" });
    const updateData = { item, title, promoCode, discount, expiryDate };
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
  getPromoByItem,
};
