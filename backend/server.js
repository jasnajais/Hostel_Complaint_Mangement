import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from './models/Admin.js';
import authRoutes from './routes/authRoutes.js';
import complaintRoutes from './routes/complaintRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('Hostel Complaint Management API is running...');
});

// Admin Seeding Logic
const seedAdmin = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);

      const defaultAdmin = new Admin({
        email: 'admin@hostel.com',
        password: hashedPassword,
        role: 'admin',
      });

      await defaultAdmin.save();
      console.log('Default admin account seeded successfully: admin@hostel.com / admin123');
    } else {
      console.log('Admin account already exists, skipping seeding.');
    }
  } catch (error) {
    console.error('Error seeding admin account:', error);
  }
};

const startServer = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hostel_complaints';

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log('MongoDB connected successfully');
    await seedAdmin();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.error('Fix the MongoDB URI or whitelist this machine in Atlas, then restart the server.');
    process.exit(1);
  }
};

startServer();

