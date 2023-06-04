const express = require('express')
const router = express.Router()
const cartsController = require('../controllers/cartsController')
const {verifyJWT, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../middleware/verifyJWT')

router.use(verifyJWT)

// Customer
router.route('/cart/:userId')
    .get(verifyTokenAndAuthorization, cartsController.getUserCart)           

router.route('/cart')
    .post(cartsController.createNewCart)                            // check

router.route('/cart/:id')
    .patch(verifyTokenAndAuthorization, cartsController.updateCart)       
    .delete(verifyTokenAndAuthorization, cartsController.deleteCart)  


// Admin
router.route('/admin/cart')
    .get(verifyTokenAndAdmin, cartsController.getAllCart)       
        
    

module.exports = router
