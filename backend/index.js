const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors'); 
// const { default: App } = require('../frontend/src/App');

const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () =>{
    console.log(`server is run on port ${port}`)
});

app.use(cors()); 
app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URI || "mongodb+srv://david:xwoUUMmdZNjnQmcS@cluster0.uvq3y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));