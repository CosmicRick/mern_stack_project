import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import connectDB from './utils/db.js';
import userRoutes from './routes/user.rout.js';
import jobRoutes from './routes/job.rout.js';
import applicationRoutes from './routes/application.rout.js';
import companyRoutes from './routes/company.rout.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// 🔌 Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// CORS setup
const corsOptions = {
  origin: '*', // Replace with frontend URL in production
  credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/application', applicationRoutes);
app.use('/api/company', companyRoutes);

app.get("/home", (req, res) => {
  return res.status(200).json({
    message: "Hello from the backend",
    success: true
  });
});

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "My name is Sayandip",
    success: true
  });
});

// ✅ Connect DB & Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () =>
      console.log("✅ Server is running on http://localhost:5000")
    );
  })
  .catch((err) => console.error("❌ DB connection error:", err));
