
import React, { useState } from 'react';

function Login({ onLogin }) {
	const [form, setForm] = useState({ email: '', password: '' });
	const [error, setError] = useState('');

	const handleChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setError('');
		try {
			const res = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form)
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.message);
			localStorage.setItem('token', data.token);
			if (onLogin) onLogin(data.user);
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
				<input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
				<button type="submit">Login</button>
			</form>
			{error && <p style={{color:'red'}}>{error}</p>}
		</div>
	);
}

export default Login;
