const express = require('express');
const router = express.Router();
const { createProduct, getProducts } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

// Route to fetch all products (Public - anyone can browse)
router.get('/', getProducts);

// Route to create a product (Protected - must have a VIP wristband)
router.post('/', protect, createProduct);
router.delete('/:id', protect, deleteProduct); 
router.put('/:id/sold', protect, markAsSold);

module.exports = router;