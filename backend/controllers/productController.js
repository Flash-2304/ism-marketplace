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

const deleteProduct = async (req, res) => {
    try {
        //Find the specific product by the ID in the URL
        const product = await Product.findById(req.params.id);

        //Check if the product actually exists
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        //The Authorization Check (The Fortress Wall)
        if (product.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized to delete this product' });
        }

        //Execute the deletion
        await product.deleteOne();

        res.status(200).json({ id: req.params.id, message: 'Product removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product', error: error.message });
    }
};

const markAsSold = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        //Ownership check
        if (product.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized to update this product' });
        }

        //Flip the boolean
        product.isSold = true;
        
        //Save the updated product back to the database
        const updatedProduct = await product.save();

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update product' });
    }
};

// Fetch a single product by its ID and include the seller's contact info
const getProductById = async (req, res) => {
    try {
        // .populate() is MongoDB magic. Instead of just giving us the seller's ID, 
        // it goes to the User database and fetches their name and WhatsApp number!
        const product = await Product.findById(req.params.id).populate('user', 'name whatsappNumber');
        
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch product details' });
    }
};

module.exports = { createProduct, getProducts, deleteProduct, markAsSold , getProductById};