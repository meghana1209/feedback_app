
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validatePassword } = require('../utils/validator');

// Signup route
router.post('/signup', async (req, res) => {
	try {
		const { name, email, password, role } = req.body;
		if (!validatePassword(password)) {
			return res.status(400).json({ message: 'Password must be at least 8 chars, 1 number, 1 special char.' });
		}
		const user = new User({ name, email, password, role });
		await user.save();
		res.status(201).json({ message: 'Signup successful' });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Login route
router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user || user.blocked) {
			return res.status(401).json({ message: 'Invalid credentials or user blocked' });
		}
		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}
		const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
		res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

module.exports = router;
