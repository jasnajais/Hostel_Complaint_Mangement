import fs from 'fs';
import path from 'path';
import Complaint from '../models/Complaint.js';
import Student from '../models/Student.js';

export const createComplaint = async (req, res) => {
  try {
    const { title, category, description } = req.body;

    if (!title || !category || !description) {
      return res.status(400).json({ message: 'Title, category, and description are required' });
    }

    const student = await Student.findById(req.user.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const complaint = await Complaint.create({
      title,
      category,
      description,
      imageUrl,
      student: student._id,
      studentName: student.name,
      roomno: student.roomno,
    });

    res.status(201).json({ message: 'Complaint submitted successfully', complaint });
  } catch (error) {
    console.error('Error in createComplaint:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ student: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    console.error('Error in getMyComplaints:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateComplaint = async (req, res) => {
  try {
    const { title, category, description } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    if (complaint.student.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this complaint' });
    }

    if (complaint.status === 'Resolved') {
      return res.status(400).json({ message: 'Cannot update a resolved complaint' });
    }

    if (title) complaint.title = title;
    if (category) complaint.category = category;
    if (description) complaint.description = description;

    if (req.file) {
      if (complaint.imageUrl) {
        const oldPath = path.join(process.cwd(), complaint.imageUrl);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      complaint.imageUrl = `/uploads/${req.file.filename}`;
    }

    await complaint.save();
    res.status(200).json({ message: 'Complaint updated successfully', complaint });
  } catch (error) {
    console.error('Error in updateComplaint:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    if (complaint.student.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this complaint' });
    }

    if (complaint.imageUrl) {
      const imagePath = path.join(process.cwd(), complaint.imageUrl);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await complaint.deleteOne();
    res.status(200).json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    console.error('Error in deleteComplaint:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate('student', 'name email roomno')
      .sort({ createdAt: -1 });

    res.status(200).json({
      total: complaints.length,
      complaints,
    });
  } catch (error) {
    console.error('Error in getAllComplaints:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Assigned', 'In Progress', 'Resolved'];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Valid status is required' });
    }

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    complaint.status = status;
    await complaint.save();

    res.status(200).json({ message: 'Status updated successfully', complaint });
  } catch (error) {
    console.error('Error in updateComplaintStatus:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
