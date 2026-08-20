const Product = require('../models/productModel');

const createProduct = async (req, res) => {
    const { name, price, description, category, imageUrl } = req.body;

    //Basic validation
    if (!name || !price || !description || !category || !imageUrl) {
        return res.status(400).json({ message: 'Please include all required fields' });
    }

    try {
        //Create the product securely
        const product = await Product.create({
            user: req.user.id, // Securely pulled from the JWT, NOT the frontend
            name,
            price,
            description,
            category,
            imageUrl,
        });

        // Send success response
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create product', error: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        // Fetch all unsold products, newest first
        const products = await Product.find({ isSold: false })
            .populate('user', 'name whatsappNumber email')
            .sort({ createdAt: -1 });

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products' });
    }
};

module.exports = { createProduct, getProducts };