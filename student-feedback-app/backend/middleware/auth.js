
const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
	const token = req.header('Authorization')?.replace('Bearer ', '');
	if (!token) return res.status(401).json({ message: 'No token provided' });
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (err) {
		res.status(401).json({ message: 'Invalid token' });
	}
}

function requireRole(role) {
	return (req, res, next) => {
		if (req.user?.role !== role) {
			return res.status(403).json({ message: 'Forbidden' });
		}
		next();
	};
}

module.exports = { authenticateJWT, requireRole };
