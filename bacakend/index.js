import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';

const app = express();

dotenv.config();

const connectToDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI).then(() => {
            console.log('connected to the database...');
        });
    } catch(error) {
        console.log(`Something went wrong ${error}`);
    }
}

connectToDb();

app.use('/api', userRoutes);

app.listen(process.env.APP_PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.APP_URL}:${process.env.APP_PORT}`);
})