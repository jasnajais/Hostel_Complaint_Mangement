import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Student from '../models/Student.js';
import Admin from '../models/Admin.js';

// Register a new student
export const registerStudent = async (req, res) => {
  try {
    const { name, email, password, roomno } = req.body;

    if (!name || !email || !password || !roomno) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student with this email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create student
    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,
      roomno,
    });
    

    await newStudent.save();

    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    console.error('Error in registerStudent:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Student Login
export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find student
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: student._id, role: 'student' },
      process.env.JWT_SECRET || 'your_super_secret_key',
      { expiresIn: '1d' }
    );

    res.status(200).json({
      token,
      role: 'student',
      user: {
        id: student._id,
        name: student.name,
        email: student.email,
        roomno: student.roomno,
      },
    });
  } catch (error) {
    console.error('Error in loginStudent:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin Login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: admin._id, role: 'admin' },
      process.env.JWT_SECRET || 'your_super_secret_key',
      { expiresIn: '1d' }
    );

    res.status(200).json({
      token,
      role: 'admin',
      user: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error('Error in loginAdmin:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
