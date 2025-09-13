
import React, { useState } from 'react';

function Signup() {
	const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
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
			const res = await fetch('/api/auth/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form)
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.message);
			setSuccess('Signup successful! You can now log in.');
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div>
			<h2>Signup</h2>
			<form onSubmit={handleSubmit}>
				<input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
				<input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
				<input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
				<select name="role" value={form.role} onChange={handleChange}>
					<option value="student">Student</option>
					<option value="admin">Admin</option>
				</select>
				<button type="submit">Sign Up</button>
			</form>
			{error && <p style={{color:'red'}}>{error}</p>}
			{success && <p style={{color:'green'}}>{success}</p>}
		</div>
	);
}

export default Signup;
