
import React, { useState } from 'react';

function FeedbackForm({ courses }) {
	const [form, setForm] = useState({ course: '', rating: 5, message: '' });
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setError('');
		setSuccess('');
		try {
			const token = localStorage.getItem('token');
			const res = await fetch('/api/feedback', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify(form)
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.message);
			setSuccess('Feedback submitted!');
			setForm({ course: '', rating: 5, message: '' });
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div>
			<h2>Submit Feedback</h2>
			<form onSubmit={handleSubmit}>
				<select name="course" value={form.course} onChange={handleChange} required>
					<option value="">Select Course</option>
					{courses && courses.map(c => (
						<option key={c._id} value={c._id}>{c.name}</option>
					))}
				</select>
				<input name="rating" type="number" min="1" max="5" value={form.rating} onChange={handleChange} required />
				<textarea name="message" placeholder="Your feedback" value={form.message} onChange={handleChange} required />
				<button type="submit">Submit</button>
			</form>
			{error && <p style={{color:'red'}}>{error}</p>}
			{success && <p style={{color:'green'}}>{success}</p>}
		</div>
	);
}

export default FeedbackForm;
