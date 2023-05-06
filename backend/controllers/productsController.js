const Product = require("../models/Product");
const asyncHandler = require('express-async-handler')
const bcrypt = require("bcrypt");
const ApiFeatures = require("../utils/apiFeatures");

// @desc Get all products in customer
// @route GET products
// @access Private
const getAllProducts = asyncHandler(async (req, res) => {
    
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter();

    let products = await apiFeature.query;

    let filteredProductsCount = products.length;

    apiFeature.pagination(resultPerPage);

    products = await apiFeature.query;

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    });
})


// @desc Get all products in admin
// @route GET /admin/products
// @access Private
const getAllProductsAdmin = asyncHandler(async (req, res) => {
    
    const product = await Product.find(req.body)
    return res.status(201).json({ success: true, product })
})


// @desc Get products info in customer and admin
// @route GET products
// @access Private
const getProductInfo = asyncHandler(async (req, res) => {

    const { id } = req.body

    const product = await Product.findById(id).exec()
    
    // Confirm if product exists
    if(!product) {
        return res.status(400).json({ message: 'Product not found' })
    }

    return res.status(201).json({ success: true, product })  // message: `${product.name}`

})

// @desc Create new product in admin
// @route POST /admin/products
// @access Private
const createNewProduct = asyncHandler(async (req, res) => {

    const product = await Product.create(req.body)
    return res.status(201).json({ success: true, product })

    // const { name, description, price, password, mobileNumber, roles } = req.body

    // // Confirm data
    // if (!firstname || !password || !mobileNumber || !Array.isArray(roles) || !roles.length) {
    //     return res.status(400).json({ message: 'All fields are required' })
    // }

    // // Check for duplicate product
    // const duplicate = await User.findOne({ username }).lean().exec()

    // if (duplicate) {
    //     return res.status(409).json({ message: 'Duplicate username' })
    // }

    // // Hash password 
    // const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    // const userObject = { username, "password": hashedPwd, roles }

    // // Create and store new user 
    // const user = await User.create(userObject)

    // if (user) { //created 
    //     res.status(201).json({ message: `New user ${username} created` })
    // } else {
    //     res.status(400).json({ message: 'Invalid user data received' })
    // }
})


// @desc Update a product in admin
// @route PATCH /admin/products
// @access Private
const updateProduct = asyncHandler(async (req, res) => {
    
    const { id } = req.body

    const product = await Product.findById(id).exec()

    // Confirm if product exists
    if(!product) {
        return res.status(400).json({ message: 'Product not found' })
    }
    
    return res.status(500).json({ success: true, message: `${product.name}` })
    
    // const { id, username, roles, active, password } = req.body

    // // Confirm data 
    // if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
    //     return res.status(400).json({ message: 'All fields except password are required' })
    // }

    // // Does the user exist to update?
    // const user = await User.findById(id).exec()

    // if (!user) {
    //     return res.status(400).json({ message: 'User not found' })
    // }

    // // Check for duplicate 
    // const duplicate = await User.findOne({ username }).lean().exec()

    // // Allow updates to the original user 
    // if (duplicate && duplicate?._id.toString() !== id) {
    //     return res.status(409).json({ message: 'Duplicate username' })
    // }

    // user.username = username
    // user.roles = roles
    // user.active = active

    // if (password) {
    //     // Hash password 
    //     user.password = await bcrypt.hash(password, 10) // salt rounds 
    // }

    // const updatedUser = await user.save()

    // res.json({ message: `${updatedUser.username} updated` })
})


// @desc Delete a product in admin
// @route DELETE /admin/products
// @access Private
const deleteProduct = asyncHandler(async (req, res) => {

    const { id } = req.body

    const product = await Product.findById(id).exec()
    
    // Confirm if product exists
    if(!product) {
        return res.status(400).json({ message: 'Product not found' })
    }

    const result = await product.deleteOne()

    return res.status(200).json({ success: true, message: `Product ${result.name} with ID ${result._id} Delete Successfully` })

    // const { id } = req.body

    // // Confirm data
    // if (!id) {
    //     return res.status(400).json({ message: 'Product ID Required' })
    // }

    // //Product cannot be deleted if there is still pending Order from a Customer
    // // Does the user still have assigned Order?
    // const note = await Order.findOne({ user: id }).lean().exec()
    // if (note) {
    //     return res.status(400).json({ message: 'Product has assigned orders' })
    // }

    // // Does the product exist to delete?
    // const product = await User.findById(id).exec()

    // if (!product) {
    //     return res.status(400).json({ message: 'Product not found' })
    // }

    // const result = await product.deleteOne()

    // const reply = `Product ${result.username} with ID ${result._id} deleted`

    // res.json(reply)
})

module.exports = {
    getAllProducts,
    getAllProductsAdmin,
    getProductInfo,
    createNewProduct,
    updateProduct,
    deleteProduct
}
