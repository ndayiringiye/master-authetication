import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import loginRoute from './routes/userRoute.js';

 dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/user", loginRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

mongoose.connect(process.env.MONGO_URI || "mongodb+srv://david:xwoUUMmdZNjnQmcS@cluster0.uvq3y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
