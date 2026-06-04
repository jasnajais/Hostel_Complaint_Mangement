import express from 'express';
import { registerStudent, loginStudent, loginAdmin } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerStudent);
router.post('/login/student', loginStudent);
router.post('/login/admin', loginAdmin);

export default router;
