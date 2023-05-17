const Product = require("../models/Product");
const asyncHandler = require('express-async-handler')
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("../utils/cloudinary");

// @desc Get all products in customer
// @route GET products
// @access Private


const getAllProducts = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    const products = await Product.find().select('-password').lean()

    // If no users 
    if (!products?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(products)
})

const getSearchProducts = asyncHandler(async (req, res) => {
    
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
const createNewProduct = asyncHandler(async (req, res, next) => {

    const { id, name, description, price, category, image  } = req.body

    try {
        let images = [];
        // console.log(req.body.image)
        console.log(req.body)

        if (typeof req.body.image === "string") {
            images.push(req.body.image);
        } else {
            images = req.body.image;
        }

        const imagesLinks = [];

        console.log(images.length)

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.uploader.upload(images[i], {
                folder: "products",
            });
        
            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
            console.log(result.public_id)
            console.log(result.secure_url)
        }

        req.body.image = imagesLinks;
        // req.body.user = req.user.id;
        console.log('imageLinks: ',imagesLinks)
        console.log('req.body.image: ',req.body.image)

        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product,
        });

    } catch (error) {
        console.log(error);
        next(error);

    }
})


// @desc Update a product in admin
// @route PATCH /admin/products
// @access Private
const updateProduct = asyncHandler(async (req, res, next) => {
    
    const { id } = req.body

    let product = await Product.findById(id);

    // Confirm if product exists

    if(!product) {
        return res.status(400).json({ message: 'Product not found' })
    }
    
    try {
        let images = [];

        if (typeof req.body.image === "string") {
            images.push(req.body.image);
        } else {
            images = req.body.image;
        }

        // Delete images from cloudinary
        console.log('product.image.public_id BEFORE delete cloudinary:',product.image.public_id)
        if (product.image.public_id !== ''){
            for (let i = 0; i < product.image.length; i++) {
                await cloudinary.uploader.destroy(product.image[i].public_id);
            }
        }
        console.log('product.image.public_id AFTER delete cloudinary:',product.image.public_id)
        console.log('req.body.image AFTER delete cloudinary: ',req.body.image)

        const imagesLinks = [];

        console.log(images.length)

        // Upload images to cloudinary
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.uploader.upload(images[i], {
                folder: "products",
            });
        
            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
            console.log(result.public_id)
            console.log(result.secure_url)
        }

        req.body.image = imagesLinks;
        // req.body.user = req.user.id;
        console.log('imageLinks: ',imagesLinks)
        console.log('req.body.image: ',req.body.image)

        const product = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        return res.status(500).json({ success: true, message: `${product.name}` })
    } catch (error) {
        console.log(error);
        next(error);
    }
    
})


// @desc Delete a product in admin
// @route DELETE /admin/products
// @access Private
const deleteProduct = asyncHandler(async (req, res, next) => {

    try {
        const { id } = req.body

        const product = await Product.findById(id).exec()
        
        // Confirm if product exists
        if(!product) {
            return res.status(400).json({ message: 'Product not found' })
        }
        console.log('product.image.public_id BEFORE delete cloudinary:',product.image.public_id)
        if (product.image.public_id !== ''){
            for (let i = 0; i < product.image.length; i++) {
                await cloudinary.uploader.destroy(product.image[i].public_id);
            }
        }
        console.log('product.image.public_id AFTER delete cloudinary:',product.image.public_id)
        console.log('req.body.image AFTER delete cloudinary: ',req.body.image)
        const result = await product.deleteOne()

        return res.status(200).json({ 
            success: true, 
            message: `Product ${result.name} with ID ${result._id} Delete Successfully` 
        })
    
    } catch (error) {
        console.log(error);
        next(error);
    }
})

module.exports = {
    getAllProducts,
    getSearchProducts,
    getAllProductsAdmin,
    getProductInfo,
    createNewProduct,
    updateProduct,
    deleteProduct
}
