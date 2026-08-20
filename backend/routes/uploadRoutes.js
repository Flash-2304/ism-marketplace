const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { protect } = require('../middleware/authMiddleware'); // Our bouncer from Day 3
const router = express.Router();

// 1. Configure Multer to hold the file in Memory (RAM)
const storage = multer.memoryStorage();
const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// 2. The Route Logic
router.post('/', protect, upload.single('image'), async (req, res) => {
    try {
        // Check if a file was actually sent
        if (!req.file) {
            return res.status(400).json({ message: 'No image file provided' });
        }

        // Convert the RAM buffer into a format Cloudinary can read
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        let dataURI = `data:${req.file.mimetype};base64,${b64}`;

        // Send to Cloudinary
        const result = await cloudinary.uploader.upload(dataURI, {
            folder: 'ism_marketplace',
        });

        // Send the secure URL back to the frontend
        res.status(200).json({
            message: 'Image uploaded successfully',
            imageUrl: result.secure_url,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Image upload failed' });
    }
});

module.exports = router;