const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        required: true,
    },
    image: {
        type: String,
        default: "",
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    itemCode: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    hasStock: {
        type: String,
        enum: ["In Stock", "Out of Stock"],
        default: "In Stock",
    },
    review: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
    }
}, { timestamps: true });

module.exports = mongoose.model("Item", ItemSchema);