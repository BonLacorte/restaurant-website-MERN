const Cart = require('../models/Cart');
const asyncHandler = require('express-async-handler')
const cloudinary = require("../utils/cloudinary");

// @desc Get user cart item
// @route GET /cart/:Userid
// @access Private
const getUserCart = asyncHandler(async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
})

// @desc Get all cart items
// @route GET /cart/
// @access Private
const getAllCart = asyncHandler(async (req, res, next) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
})

// @desc Create cart item
// @route GET /cart/
// @access Private
const createNewCart = asyncHandler(async (req, res, next) => {
    try {
        const newCart = new Cart(req.body);

        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }
    catch(error) {
        console.log(error);
        next(error);
    }
})

// @desc Update cart item
// @route GET /cart/users
// @access Private
const updateCart = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.body

        const updatedCart = await Cart.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        res.status(201).json(updatedCart);
    }
    catch(error) {
        console.log(error);
        next(error);
    }
})
// @desc Delete cart item
// @route GET /cart/users
// @access Private
const deleteCart = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.body
        
        const cart = new Cart.findById(id)

        cart = await cart.deleteOne();

        return res.status(201).json(newCart);
    }
    catch(error) {
        console.log(error);
        next(error);
    }
})

module.exports = {
    getUserCart,
    getAllCart,
    createNewCart,
    updateCart,
    deleteCart
}