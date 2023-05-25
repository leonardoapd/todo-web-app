import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { validateForm } from '../../services/inputs-validation';
import { login } from '../../services/http-client-service';
import { images } from '../../constants/index';
import { UserCredentials } from '../../models/user-credentials';
import TextInput from '../../components/TextInput/TextInput';
import './Login.css';

export default function Login() {

    const [formValues, setFormValues] = useState(new UserCredentials());
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();

    const handleChange = (newValue, e) => {
        const { name } = e.target;
        setFormValues({ ...formValues, [name]: newValue });

        //Validating the form
        setIsValid(validateForm());
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Form values", formValues);

        login(formValues).then(() => {
            // Go to users page
            navigate('/users');
        });
    }

    return (
        <>
            <main className='app__main login-main'>
                <img className='app__img' src={images.pana} alt='login' />
                <section className="app__form-container">
                    <h1 className="app__title">Welcome back!</h1>
                    <form className="app__form" onSubmit={handleSubmit}>
                        <TextInput
                            label="Email"
                            value={formValues.email}
                            name="email"
                            onChange={handleChange}
                            type="email" />
                        <TextInput
                            label="Password"
                            value={formValues.password}
                            name="password"
                            onChange={handleChange}
                            type="password" />
                        <div className="login-form-group">
                            <button className="app__button" type="submit" disabled={!isValid}>
                                Login
                            </button>
                        </div>
                    </form>
                    <aside className="login-register-anker">
                        <Link to='/register'>Don&rsquo;t have an account? Sign Up</Link>
                    </aside>
                </section>

            </main>
        </>
    );
}