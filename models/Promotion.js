const mongoose = require('mongoose');

const PromoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    prmoCode: {
        type: String,
        required: true,
    },
    promoPrice: {
        type: Number,
    }
});

module.exports = mongoose.model("Promotion", PromoSchema);