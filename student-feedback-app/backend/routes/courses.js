
const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { authenticateJWT, requireRole } = require('../middleware/auth');

// Get all courses (students)
router.get('/', authenticateJWT, async (req, res) => {
	try {
		const courses = await Course.find();
		res.json(courses);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Add course (admin)
router.post('/', authenticateJWT, requireRole('admin'), async (req, res) => {
	try {
		const course = new Course(req.body);
		await course.save();
		res.status(201).json(course);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Edit course (admin)
router.put('/:id', authenticateJWT, requireRole('admin'), async (req, res) => {
	try {
		const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
		res.json(course);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Delete course (admin)
router.delete('/:id', authenticateJWT, requireRole('admin'), async (req, res) => {
	try {
		await Course.findByIdAndDelete(req.params.id);
		res.json({ message: 'Course deleted' });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

module.exports = router;
