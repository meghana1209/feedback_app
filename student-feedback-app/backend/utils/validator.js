
// Password must be at least 8 chars, 1 number, 1 special char
function validatePassword(password) {
	const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
	return regex.test(password);
}

module.exports = { validatePassword };
