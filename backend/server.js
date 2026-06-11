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

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hostel_complaints')
  .then(async () => {
    console.log('MongoDB connected successfully');
    await seedAdmin();
  })
  .catch((err) => console.log('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

