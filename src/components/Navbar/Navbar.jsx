import { images } from '../../constants';
import './Navbar.css';


export default function Navbar() {
    return (
        <>
            <nav className="navbar">
                <div className="navbar-logo">
                    <img src={images.logo} alt="logo" />
                </div>
                <div>
                    <h1 className="navbar-title">My ToDo App</h1>
                </div>
            </nav>
        </>
    );
}
