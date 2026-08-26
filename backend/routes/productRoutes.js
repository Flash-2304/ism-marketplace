const express = require('express');
const router = express.Router();
const {createProduct,getProducts,deleteProduct,markAsSold ,getMyProducts,getProductById} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

// Route to fetch all products (Public - anyone can browse)
router.get('/', getProducts);

// Route to create a product (Protected - must have a VIP wristband)
router.post('/', protect, createProduct);
router.get('/my-listings', protect, getMyProducts);
router.get('/:id', getProductById);
router.delete('/:id', protect, deleteProduct); 
router.put('/:id/sold', protect, markAsSold);
router.get('/:id', getProductById);

module.exports = router;