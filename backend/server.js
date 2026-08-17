//Imports
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); //DATABASE
require('dotenv').config(); 

//Initialize the Express app
const app = express();

//Connection to database
connectDB();


//MiddleWares
app.use(cors()); //Allows frontend to make requests
app.use(express.json()); //Express to understand data sent in json Requests


//Routes

app.get('/', (req, res) => {
    res.send('IIT ISM Marketplace API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});