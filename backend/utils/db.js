// config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Use Mongo URI from .env file
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // Exit process if DB fails
  }

  // Handle runtime errors after connection
  mongoose.connection.on('error', (err) => {
    console.error("❌ MongoDB runtime error:", err);
  });
};

export default connectDB;
