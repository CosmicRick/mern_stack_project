import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import connectDB from './utils/db.js';


// Routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/user.rout.js';
import jobRoutes from './routes/job.rout.js';
import applicationRoutes from './routes/application.rout.js';


// Utils
// import { notFound, errorHandler } from './src/middleware/error.middleware.js';


// Load env
dotenv.config();


// Connect DB
connectDB();


const app = express();


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());


// File uploads (static)
app.use('/uploads', express.static('uploads'));


// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);




// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));