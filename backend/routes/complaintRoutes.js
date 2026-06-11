import express from 'express';
import upload from '../middleware/upload.js';
import { protect, authorizeStudent, authorizeAdmin } from '../middleware/authMiddleware.js';
import {
  createComplaint,
  getMyComplaints,
  updateComplaint,
  deleteComplaint,
  getAllComplaints,
  updateComplaintStatus,
} from '../controllers/complaintController.js';

const router = express.Router();

const handleUpload = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message || 'File upload failed' });
    }
    next();
  });
};

router.post('/', protect, authorizeStudent, handleUpload, createComplaint);
router.get('/my', protect, authorizeStudent, getMyComplaints);
router.put('/:id', protect, authorizeStudent, handleUpload, updateComplaint);
router.delete('/:id', protect, authorizeStudent, deleteComplaint);

router.get('/', protect, authorizeAdmin, getAllComplaints);
router.patch('/:id/status', protect, authorizeAdmin, updateComplaintStatus);

export default router;
