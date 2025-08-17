import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js'; // Make sure this file exists and exports connectDB
import userRoutes from './routes/user.rout.js'; // Import user routes
import jobRoutes from './routes/job.rout.js'; // Import job routes
import applicationRoutes from './routes/application.rout.js'; // Import application routes
import companyroutes from './routes/company.rout.js'; // Import company routes
import axios from 'axios'; // Import axios for AI API calls

dotenv.config(); //  No need to pass an empty object

const app = express();

// 🔌 Middleware
app.use(express.json());
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
const PORT = process.env.PORT || 8000;
const startServer = async () => {
    try {
        await connectDB(); //  Wait until DB connects
        app.listen(PORT, () => {
            console.log(` Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error(" Failed to start server:", error);
        process.exit(1);
    }
};
app.use('/api/users', userRoutes); // Use user routes
app.use('/api/jobs', jobRoutes);
app.use('/api/application',applicationRoutes);
app.use('/api/company',companyroutes);
startServer();
