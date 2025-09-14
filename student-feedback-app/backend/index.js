
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);


// Connect to MongoDB
connectDB();
// Example test route
app.get('/', (req, res) => {
	res.send('Student Feedback API is running!');
});
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});


// Centralized error handler
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
