const Order = require("../models/Order");
const Product = require("../models/Product");
const asyncHandler = require('express-async-handler')

// @desc Get all products in admin
// @route GET products
// @access Private
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
    });

// @desc Get order info customer and admin
// @route GET products
// @access Private
const getOrderInfo = asyncHandler(async (req, res) => {
    
    const { id } = req.body

    const order = await Order.findById(id).exec()

    // Confirm if order exists
    if (!order) {
        return res.status(400).json({ message: 'Order not found' })
    }

    res.status(200).json({ success: true, order });
});



// @desc Create new product in customer
// @route POST /orders/new
// @access Private
const createNewOrder = asyncHandler(async (req, res) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        user
    } = req.body;

    // Confirm data
    if (!user) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const order = await Order.create({
        shippingInfo,
        orderItems,
        user,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
    });

    res.status(201).json({
        success: true,
        order,
    });
});



// @desc Update a product in admin
// @route PATCH /admin/orders/:id
// @access Private
const updateOrder = asyncHandler(async (req, res) => {
    
    const { id, orderStatus } = req.body
    
    const order = await Order.findById(id).exec()

    // Confirm if order exists
    if(!order) {
        return res.status(400).json({ message: 'Order not found' })
    }

    // Confirm if order is already delivered
    // if (order.orderStatus === "Delivered") {
    //     // order.deliveredAt = Date.now()
    //     return res.json({ message: `Updated, OrderId: ${order._id} is already delivered` }) // next(new ErrorHander("You have already delivered this order", 400))
    //     // There must be a log here that will print "order delivered ${OrderId}"
    // }

    // if (order.orderStatus === "Shipped") {
    //     return res.json({ message: `Updated, OrderId: ${order._id} is already shipped` })
    //     // There must be a log here that will print "order shipped ${OrderId}"
    // }

    order.orderStatus = req.body.orderStatus;

    if (req.body.orderStatus === "Delivered") {
        order.deliveredAt = Date.now();
      }

    const updatedOrder = await order.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true, message: `Updated, OrderId: ${updatedOrder._id} is now ${updatedOrder.orderStatus}`
    });
})


// @desc Delete a product in admin
// @route DELETE /admin/orders/:id
// @access Private
const deleteOrder = asyncHandler(async (req, res, next) => {

    const { id } = req.body

    const order = await Order.findById(id);

    // Confirm if order exists
    if (!order) {
        return res.status(400).json({ message: 'Order not found' })
    }

    await order.remove();

    return res.status(500).json({ success: true, message: `Deleted ${order._id}` })
});

module.exports = {
    getAllOrders,
    getOrderInfo,
    createNewOrder,
    updateOrder,
    deleteOrder,
}