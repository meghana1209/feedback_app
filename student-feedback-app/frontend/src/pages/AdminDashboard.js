
import React, { useEffect, useState } from 'react';

function AdminDashboard() {
	const [analytics, setAnalytics] = useState({});
	const [students, setStudents] = useState([]);
	const [trends, setTrends] = useState([]);
	const [msg, setMsg] = useState('');

	useEffect(() => {
		const token = localStorage.getItem('token');
		const fetchAnalytics = async () => {
			const res = await fetch('/api/admin/analytics', { headers: { 'Authorization': `Bearer ${token}` } });
			setAnalytics(await res.json());
		};
		const fetchStudents = async () => {
			const res = await fetch('/api/admin/students', { headers: { 'Authorization': `Bearer ${token}` } });
			setStudents(await res.json());
		};
		const fetchTrends = async () => {
			const res = await fetch('/api/admin/feedback-trends', { headers: { 'Authorization': `Bearer ${token}` } });
			setTrends(await res.json());
		};
		fetchAnalytics();
		fetchStudents();
		fetchTrends();
	}, []);

	const handleBlock = async (id, blocked) => {
		const token = localStorage.getItem('token');
		const res = await fetch(`/api/admin/students/${id}/block`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
			body: JSON.stringify({ blocked })
		});
		if (res.ok) setMsg('Student updated');
	};

	const handleDelete = async id => {
		const token = localStorage.getItem('token');
		const res = await fetch(`/api/admin/students/${id}`, {
			method: 'DELETE',
			headers: { 'Authorization': `Bearer ${token}` }
		});
		if (res.ok) setMsg('Student deleted');
	};

	return (
		<div>
			<h2>Admin Dashboard</h2>
			<h3>Analytics</h3>
			<p>Total Feedback: {analytics.totalFeedback}</p>
			<p>Total Students: {analytics.totalStudents}</p>
			<h3>Feedback Trends</h3>
			<ul>
				{trends.map(t => (
					<li key={t._id}>Course: {t._id}, Feedback Count: {t.count}</li>
				))}
			</ul>
			<h3>Manage Students</h3>
			{msg && <p>{msg}</p>}
			<ul>
				{students.map(s => (
					<li key={s._id}>
						{s.name} ({s.email}) {s.blocked ? '[Blocked]' : ''}
						<button onClick={() => handleBlock(s._id, !s.blocked)}>{s.blocked ? 'Unblock' : 'Block'}</button>
						<button onClick={() => handleDelete(s._id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default AdminDashboard;
