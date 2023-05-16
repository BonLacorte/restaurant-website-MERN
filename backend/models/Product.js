const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
        minLength: [1, "Product name cannot be empty"]
    },
    description: {
        type: String,
        required: [true, "Please enter product description"],
        minLength: [1, "Product description cannot be empty"]
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"],
        min: [0, "Product price must be a positive number"],
        max: [99999999, "Product price cannot exceed 99,999,999"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
        }
    ],
    category: {
        type: String,
        required: [true, "Please enter product category"]
    },
    available: {
        type: Boolean,
        default: true,
        description: "Indicates whether the product is currently available or not"
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
        }
    ],
    // user: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "User",
    //     required: true
    // },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Product", productSchema);
