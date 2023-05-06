const express = require('express')
const router = express.Router()
const ordersController = require('../controllers/ordersController')
// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

// Customer
// router.route('/orders')
//     .get(ordersController.getCustomerOrders)

router.route('/orders/:id')
    .get(ordersController.getOrderInfo)

router.route('/orders/new')
    .post(ordersController.createNewOrder)

// Admin
router.route('/admin/orders')
    .get(ordersController.getAllOrders)

router.route('/admin/orders/:id')
    .get(ordersController.getOrderInfo)
    .patch(ordersController.updateOrder)
    .delete(ordersController.deleteOrder)

module.exports = router

//  customer clicks order history button
//  find all "orders" with user id  user._id
