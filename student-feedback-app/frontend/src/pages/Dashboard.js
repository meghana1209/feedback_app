
import React, { useEffect, useState } from 'react';

function Dashboard({ courses }) {
	const [feedbacks, setFeedbacks] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchFeedbacks = async () => {
			try {
				const token = localStorage.getItem('token');
				const res = await fetch('/api/feedback/my', {
					headers: { 'Authorization': `Bearer ${token}` }
				});
				const data = await res.json();
				if (!res.ok) throw new Error(data.message);
				setFeedbacks(data);
			} catch (err) {
				setError(err.message);
			}
		};
		fetchFeedbacks();
	}, []);

	const handleDelete = async id => {
		try {
			const token = localStorage.getItem('token');
			const res = await fetch(`/api/feedback/${id}`, {
				method: 'DELETE',
				headers: { 'Authorization': `Bearer ${token}` }
			});
			if (!res.ok) throw new Error('Delete failed');
			setFeedbacks(feedbacks.filter(fb => fb._id !== id));
		} catch (err) {
			setError(err.message);
		}
	};

	// Edit functionality can be added similarly

	return (
		<div>
			<h2>My Feedback</h2>
			{error && <p style={{color:'red'}}>{error}</p>}
			<ul>
				{feedbacks.map(fb => (
					<li key={fb._id}>
						<strong>{fb.course?.name || 'Course'}</strong> - Rating: {fb.rating} <br />
						{fb.message}
						<button onClick={() => handleDelete(fb._id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Dashboard;
