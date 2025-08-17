import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js'; 
import userRoutes from './routes/user.rout.js'; 
import jobRoutes from './routes/job.rout.js'; 
import applicationRoutes from './routes/application.rout.js'; 
import companyroutes from './routes/company.rout.js'; 
import mongoose from 'mongoose';
const authRoutes = require('./routes/auth.rout.js'); // Import auth routes

dotenv.config(); 



const app = express();

// 🔌 Middleware
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: '*', //  Replace with frontend URL in production
    credentials: true,
};
app.use(cors(corsOptions));

//  Routes
app.get("/home", (req, res) => {
    return res.status(200).json({
        message: "Hello from the backend",
        success: true
    });
});
app.get("/", (req, res) => {
    return res.status(200).json({
        message: "My name is supradip",
        success: true
    });
});

//  Connect DB before starting server
mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(5000,()=> console.log("Server is running on port 5000")))
    .catch((err) => console.log(err));
app.use('/api/users', userRoutes); // Use user routes
app.use('/api/jobs', jobRoutes);
app.use('/api/application',applicationRoutes);
app.use('/api/company',companyroutes);
startServer();
