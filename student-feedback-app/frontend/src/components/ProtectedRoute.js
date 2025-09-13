
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, allowedRoles }) {
	const token = localStorage.getItem('token');
	const user = token ? JSON.parse(atob(token.split('.')[1])) : null;

	if (!token) return <Navigate to="/login" />;
	if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" />;
	return children;
}

export default ProtectedRoute;
