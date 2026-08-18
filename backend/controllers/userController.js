const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Helper function to create the VIP wristband
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

//Authentication
const authUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

const registerUser = async (req, res) => {
    const { name, email, password, whatsappNumber } = req.body;

    //Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    //Hash password (scramble it)
    const salt = await bcrypt.genSalt(10); // Adds random data to make the hash unique
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create user in the database
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        whatsappNumber,
    });

    //Send back success and the JWT wristband
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id), // Giving them the wristband immediately
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

module.exports = { registerUser , authUser};