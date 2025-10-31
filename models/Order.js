const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
        required: true,
    },
    deliAddress: {
        type: String,
        required: true
    },
    deliContact: {
        type: String,
        required: true
    },
    orderNumber: {
        type: String,
        required: true,
    },
    orderStatus: {
        type: String,
        enum: ["Ordered", "Delivered"],
        default: "Ordered",
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);