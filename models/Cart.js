const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true,
    },
    quantity: {
        type: Number
    },
}, { timestamps: true });

module.exports = mongoose.model("Cart", CartSchema);