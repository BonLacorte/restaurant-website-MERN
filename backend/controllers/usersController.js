const User = require('../models/User')
const Order = require('../models/Order')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Get all users in admin
// @route GET /admin/users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    const users = await User.find().select('-password').lean()

    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
})

// @desc Get user info in admin
// @route GET /users
// @access Private
const getUserInfo = asyncHandler(async (req, res) => {

    const { id } = req.body

    const user = await User.findById(id).exec()
    
    // Confirm if product exists
    if(!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    return res.status(201).json({ success: true, product })
})


// @desc Get order history of customer in customer and admin
// @route GET users/orders
// @access Private
const getUserOrders = asyncHandler(async (req, res) => {

    const { id } = req.body
    
    // Show all orders of user
    const orders = await Order.find({ user: id }).lean().exec()

    res.status(200).json({
        success: true,
        orders,
    });
    });


// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, password, roles, mobileNumber } = req.body

    // Confirm data
    if (!firstname || !password || !mobileNumber || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate email
    const duplicate = await User.findOne({ email }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate email' })
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = { firstname, lastname, email, "password": hashedPwd, roles, mobileNumber }

    // Create and store new user 
    const user = await User.create(userObject)

    if (user) { //created 
        res.status(201).json({ message: `New user ${email} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, firstname, lastname, email, roles, mobileNumber, password } = req.body

    // Available fields: firstname, lastname, password, mobilenumber, (id, roles is already included)
    // Confirm data 
    if (!id || !firstname || !Array.isArray(roles) || !roles.length ||  !mobileNumber) {  // 
        return res.status(400).json({ message: 'All fields except lastname and password are required' })
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate 
    const duplicate = await User.findOne({ email }).lean().exec()

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate email' })
    }

    user.firstname = firstname
    user.lastname = lastname
    //user.email = email
    //user.roles = roles
    user.mobileNumber = mobileNumber

    if (password) {
        // Hash password 
        user.password = await bcrypt.hash(password, 10) // salt rounds 
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.email} updated` })
})


// @desc Update a user in admin
// @route PATCH /admin/users
// @access Private
//const updateUserAdmin = asyncHandler(async (req, res) => {})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Does the user exist to delete?
    const user = await User.findById(id).exec()

    // Confirm if product exists
    if(!product) {
        return res.status(400).json({ message: 'Product not found' })
    }

    const result = await user.deleteOne()

    const reply = `Email ${result.email} with ID ${result._id} deleted`

    res.json(reply)
})


module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getUserInfo,
    getUserOrders
}