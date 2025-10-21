const mongoose = require('mongoose');

const PromoSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    promoCode: {
        type: String,
    },
    expiryDate: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model("Promotion", PromoSchema);