const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: [true, 'Please add a product name'],
        },
        price: {
            type: Number,
            required: [true, 'Please add a price'],
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        category: {
            type: String,
            required: [true, 'Please select a category'],
            enum: ['Electronics', 'Books', 'Hostel Essentials', 'Bicycles', 'Other'],
        },
        imageUrl: {
            type: String,
            required: [true, 'Please add an image'],
        },
        isSold: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;