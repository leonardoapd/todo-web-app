import { Link } from 'react-router-dom';
import { images } from '../../constants/index';
import TextInput from '../../components/TextInput/TextInput';
import './Login.css';

export default function Login() {
    return (
        <>
            <main className='main'>
                <figure>
                    <img className='login-img' src={images.pana} alt='login' />
                </figure>
                <section className="login-container">
                    <h1 className="title">Welcome back!</h1>
                    <form className="login-form form">
                        <TextInput label="Email"></TextInput>
                        <TextInput label="Password" type="password"></TextInput>
                        <div className="login-form-group">
                            <button className="button" type="submit">Login</button>
                        </div>
                    </form>
                </section>

                <section className="login-register">
                    <Link to='/register'>Don&rsquo;t have an account? Register</Link>
                </section>
            </main>
        </>
    );
}