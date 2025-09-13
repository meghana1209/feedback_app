
import React, { useEffect, useState } from 'react';

function Profile() {
	const [profile, setProfile] = useState({});
	const [edit, setEdit] = useState(false);
	const [form, setForm] = useState({});
	const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' });
	const [msg, setMsg] = useState('');

	useEffect(() => {
		const fetchProfile = async () => {
			const token = localStorage.getItem('token');
			const res = await fetch('/api/auth/profile', {
				headers: { 'Authorization': `Bearer ${token}` }
			});
			const data = await res.json();
			setProfile(data);
			setForm(data);
		};
		fetchProfile();
	}, []);

	const handleChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleUpdate = async e => {
		e.preventDefault();
		setMsg('');
		const token = localStorage.getItem('token');
		const res = await fetch('/api/auth/profile', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
			body: JSON.stringify(form)
		});
		const data = await res.json();
		if (!res.ok) setMsg(data.message); else { setProfile(data); setEdit(false); setMsg('Profile updated'); }
	};

	const handlePasswordChange = async e => {
		e.preventDefault();
		setMsg('');
		const token = localStorage.getItem('token');
		const res = await fetch('/api/auth/profile/password', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
			body: JSON.stringify(passwords)
		});
		const data = await res.json();
		if (!res.ok) setMsg(data.message); else setMsg('Password updated');
	};

	// Placeholder for Cloudinary image upload
	const handleImageUpload = async e => {
		// Implement Cloudinary upload here
		setMsg('Image upload not implemented');
	};

	return (
		<div>
			<h2>Profile</h2>
			{msg && <p>{msg}</p>}
			{!edit ? (
				<div>
					<p>Name: {profile.name}</p>
					<p>Email: {profile.email}</p>
					<p>Phone: {profile.phone}</p>
					<p>DOB: {profile.dob ? new Date(profile.dob).toLocaleDateString() : ''}</p>
					<p>Address: {profile.address}</p>
					<img src={profile.profilePic || 'https://via.placeholder.com/100'} alt="Profile" width={100} />
					<button onClick={() => setEdit(true)}>Edit Profile</button>
				</div>
			) : (
				<form onSubmit={handleUpdate}>
					<input name="name" value={form.name || ''} onChange={handleChange} placeholder="Name" required />
					<input name="phone" value={form.phone || ''} onChange={handleChange} placeholder="Phone" />
					<input name="dob" type="date" value={form.dob ? form.dob.substring(0,10) : ''} onChange={handleChange} />
					<input name="address" value={form.address || ''} onChange={handleChange} placeholder="Address" />
					<button type="button" onClick={handleImageUpload}>Upload Profile Picture</button>
					<button type="submit">Save</button>
					<button type="button" onClick={() => setEdit(false)}>Cancel</button>
				</form>
			)}
			<h3>Change Password</h3>
			<form onSubmit={handlePasswordChange}>
				<input name="oldPassword" type="password" value={passwords.oldPassword} onChange={e => setPasswords({ ...passwords, oldPassword: e.target.value })} placeholder="Old Password" required />
				<input name="newPassword" type="password" value={passwords.newPassword} onChange={e => setPasswords({ ...passwords, newPassword: e.target.value })} placeholder="New Password" required />
				<button type="submit">Change Password</button>
			</form>
		</div>
	);
}

export default Profile;
