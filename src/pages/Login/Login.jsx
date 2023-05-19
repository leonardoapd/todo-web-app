import { Link } from 'react-router-dom';
import { images } from '../../constants/index';
import TextInput from '../../components/TextInput/TextInput';
import './Login.css';

export default function Login() {
    return (
        <>
            <main className='app__main login-main'>
                <img className='app__img' src={images.pana} alt='login' />
                <section className="app__form-container">
                    <h1 className="app__title">Welcome back!</h1>
                    <form className="app__form">
                        <TextInput label="Email" type="email"></TextInput>
                        <TextInput label="Password" type="password"></TextInput>
                        <div className="login-form-group">
                            <button className="app__button" type="submit">Login</button>
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