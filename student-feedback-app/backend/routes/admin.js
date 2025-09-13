
const express = require('express');
const router = express.Router();
const { authenticateJWT, requireRole } = require('../middleware/auth');
const User = require('../models/User');
const Feedback = require('../models/Feedback');

// Get analytics: total feedback, registered students
router.get('/analytics', authenticateJWT, requireRole('admin'), async (req, res) => {
	try {
		const totalFeedback = await Feedback.countDocuments();
		const totalStudents = await User.countDocuments({ role: 'student' });
		res.json({ totalFeedback, totalStudents });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Get feedback trends (feedback count per course)
router.get('/feedback-trends', authenticateJWT, requireRole('admin'), async (req, res) => {
	try {
		const trends = await Feedback.aggregate([
			{ $group: { _id: '$course', count: { $sum: 1 } } }
		]);
		res.json(trends);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Get all students
router.get('/students', authenticateJWT, requireRole('admin'), async (req, res) => {
	try {
		const students = await User.find({ role: 'student' }).select('-password');
		res.json(students);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Block/unblock student
router.put('/students/:id/block', authenticateJWT, requireRole('admin'), async (req, res) => {
	try {
		const { blocked } = req.body;
		const student = await User.findByIdAndUpdate(req.params.id, { blocked }, { new: true }).select('-password');
		res.json(student);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Delete student
router.delete('/students/:id', authenticateJWT, requireRole('admin'), async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.json({ message: 'Student deleted' });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

module.exports = router;
