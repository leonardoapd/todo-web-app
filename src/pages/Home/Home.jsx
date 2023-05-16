import { images } from '../../constants/index';
import './Home.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {

    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login');
    }

    return (
        <>
            <main className='main'>
                <header className="home-container">
                    <h1 className="title home-title">ToDo List App</h1>
                </header>
                <figure>
                    <img className='home-img' src={images.checklist} alt='home' />
                </figure>
                <section className="home-buttons-container">
                    <button
                        className="home-button button"
                        onClick={goToLogin}
                    >
                        Login
                    </button>
                    <button
                        className="home-button button"
                    >
                        Register
                    </button>
                </section>
            </main>
        </>
    );
}