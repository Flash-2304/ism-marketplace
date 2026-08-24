//Imports
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); //DATABASE
require('dotenv').config(); 

//Initialize the Express app
const app = express();

//Connection to database
connectDB();

app.use(express.json()); //Express to understand data sent in json Requests

//MiddleWares
app.use(express.json()); // Allows us to accept JSON data

app.use(cors({
    origin: '*', // Temporarily allow ANY origin to guarantee it passes
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));



//Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

app.get('/', (req, res) => {
    res.send('IIT ISM Marketplace API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});