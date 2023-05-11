const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

// Customer
router.route('/users/orders')
    .get(usersController.getUserOrders)

// Admin

router.route('/admin/users/orders')
    .get(usersController.getUserOrders)

router.route('/admin/users')
    .get(usersController.getAllUsers)
    

router.route('/admin/users/new')
    .post(usersController.createNewUser)

router.route('/admin/users/:id')
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)
    .get(usersController.getUserInfo)

// router.route('/')
//     .get(usersController.getAllUsers)
//     .post(usersController.createNewUser)
//     .patch(usersController.updateUser)
//     .delete(usersController.deleteUser)

module.exports = router
