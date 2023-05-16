const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productsController')
// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

// Customer
router.route('/products')
    .get(productsController.getAllProducts)

router.route('/product/:id')
    .get(productsController.getProductInfo)

// Admin
router.route('/admin/products')
    .get(productsController.getAllProducts)
    

router.route('/admin/products/new')
    .post(productsController.createNewProduct)

router.route('/admin/product/:id')
    .patch(productsController.updateProduct)
    .delete(productsController.deleteProduct)
    .get(productsController.getProductInfo)
    

module.exports = router
