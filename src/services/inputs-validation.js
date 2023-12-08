export function validateInput(name, value) {
	// Get the password value if the password input is not empty
	const password = document.querySelector('input[name="password"]').value;

	// Regex for email and password validation
	const emailRegex = /\S+@\S+\.\S+/;
	const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
	const textRegex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;

	// Validating the input value based on the input name and regex
	const validation = {
		email: name === 'email' ? emailRegex.test(value) : true,
		password: name === 'password' ? passwordRegex.test(value) : true,
		text: name === 'name' ? textRegex.test(value) : true,
		confirmPassword: name === 'confirmPassword' ? validatePasswordMatch(password, value) : true,
	};

	// Setting the error message based on the input name and validation
	const errorMessages = {
		email: validation.email ? '' : 'Please enter a valid email address',
		password:
			validation.password && length < 8
				? ''
				: 'The password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number',
		name: validation.text ? '' : 'Please enter a valid name',
		confirmPassword: validation.confirmPassword ? '' : 'The passwords do not match',
	};

	return errorMessages[name];
}

export function validatePasswordMatch(password, confirmPassword) {
	return password === confirmPassword;
}

// Validate the form based on the input values
export function validateForm() {
	const inputs = Array.from(document.querySelectorAll('input'));

	const isValid = inputs.every((input) => {
		return input.name === 'confirmPassword' || !validateInput(input.name, input.value);
	});

	return isValid;
}
