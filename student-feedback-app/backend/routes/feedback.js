
const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const { authenticateJWT, requireRole } = require('../middleware/auth');
const User = require('../models/User');
const Course = require('../models/Course');

// Submit feedback (student)
router.post('/', authenticateJWT, async (req, res) => {
	try {
		const { course, rating, message } = req.body;
		const feedback = new Feedback({
			course,
			rating,
			message,
			student: req.user.id
		});
		await feedback.save();
		res.status(201).json(feedback);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Get own feedback (student)
router.get('/my', authenticateJWT, async (req, res) => {
	try {
		const feedbacks = await Feedback.find({ student: req.user.id }).populate('course');
		res.json(feedbacks);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Edit feedback (student)
router.put('/:id', authenticateJWT, async (req, res) => {
	try {
		const feedback = await Feedback.findOneAndUpdate(
			{ _id: req.params.id, student: req.user.id },
			req.body,
			{ new: true }
		);
		if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
		res.json(feedback);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Delete feedback (student)
router.delete('/:id', authenticateJWT, async (req, res) => {
	try {
		const feedback = await Feedback.findOneAndDelete({ _id: req.params.id, student: req.user.id });
		if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
		res.json({ message: 'Feedback deleted' });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Admin: view all feedback, filter
router.get('/', authenticateJWT, requireRole('admin'), async (req, res) => {
	try {
		const { course, rating, student } = req.query;
		const filter = {};
		if (course) filter.course = course;
		if (rating) filter.rating = rating;
		if (student) filter.student = student;
		const feedbacks = await Feedback.find(filter).populate('course student');
		res.json(feedbacks);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Admin: export feedback as CSV
router.get('/export/csv', authenticateJWT, requireRole('admin'), async (req, res) => {
	try {
		const feedbacks = await Feedback.find({}).populate('course student');
		let csv = 'Course,Student,Rating,Message,CreatedAt\n';
		feedbacks.forEach(fb => {
			csv += `${fb.course?.name || ''},${fb.student?.name || ''},${fb.rating},"${fb.message}",${fb.createdAt.toISOString()}\n`;
		});
		res.header('Content-Type', 'text/csv');
		res.attachment('feedback.csv');
		res.send(csv);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

module.exports = router;
