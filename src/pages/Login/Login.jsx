import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { validateForm } from '../../services/inputs-validation';
import { login } from '../../services/user-services';
import { images } from '../../constants/index';
import { UserCredentials } from '../../models/user-credentials';
import TextInput from '../../components/TextInput/TextInput';
import './Login.css';
import { useAuth } from '../../context/AuthContext';
import { errorMessages } from '../../constants/index';
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
	const [formValues, setFormValues] = useState(new UserCredentials('', ''));
	const { handleLogin } = useAuth();
	const [isValid, setIsValid] = useState(false);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleChange = (newValue, e) => {
		const { name } = e.target;
		setFormValues({ ...formValues, [name]: newValue });

		// Validating the form
		setIsValid(validateForm());
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Uncomment the next line to see the form values in the console
		// console.log("Form values", formValues);

		login(formValues)
			.then(() => {
				toast.success('Login successful!');
				// Go to users page
				handleLogin();
				navigate('/mytodolist');
			})
			.catch((error) => {
				// Uncomment the next line to see the error message in the console
				// console.log("Error", error);
				// Getting the error message from the server
				const errorMessage = error.response.status;
				// Setting the error message to display
				// setError(errorMessages[errorMessage] || errorMessages[500]);
				toast.error(errorMessages[errorMessage] || errorMessages[500]);
			});
	};

	return (
		<>
			<main className='app__main login-main'>
				<img className='app__img' src={images['login']} alt='login' />
				<section className='app__form-container'>
					<h1 className='app__title'>Welcome back!</h1>
					<form className='app__form' onSubmit={handleSubmit}>
						<TextInput
							label='Email'
							value={formValues.email}
							name='email'
							onChange={handleChange}
							type='email'
							validate
						/>
						<TextInput
							label='Password'
							value={formValues.password}
							name='password'
							onChange={handleChange}
							type='password'
							validate
						/>
						{error && <p className='form-group-error'>{error}</p>}
						<div className='login-form-group'>
							<button
								className={`app__button ${!isValid && 'button__disabled'}`}
								disabled={!isValid}
								type='submit'
							>
								Login
							</button>
						</div>
					</form>
					<aside className='login-register-anker'>
						<Link to='/signup'>Don&rsquo;t have an account? Sign Up</Link>
					</aside>
				</section>
			</main>
			<Toaster position='bottom-center' reverseOrder={false} />
		</>
	);
}
