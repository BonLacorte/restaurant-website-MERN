const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    cartItems: [
        {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product",
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        }
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Cart", cartSchema);
