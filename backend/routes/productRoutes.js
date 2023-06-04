const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productsController')
const {verifyJWT, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../middleware/verifyJWT')

// router.use(verifyJWT)

// Customer
router.route('/')
    .get(productsController.getAllProducts)              // check

router.route('/:id')
    .get(productsController.getProductInfo)              // check

// Admin
router.route('/admin/products')
    .get(productsController.getAllProducts)        // check
    

router.route('/admin/products/new')
    .post(productsController.createNewProduct)     // check

router.route('/admin/products/:id')
    .patch(productsController.updateProduct)       // check
    .delete(productsController.deleteProduct)      // check
    .get(productsController.getProductInfo)        // check
    

module.exports = router
