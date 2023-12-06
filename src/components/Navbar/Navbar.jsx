import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { images } from '../../constants';
// import { logout, getUser } from "../../services/http-client-service";
import { useMobileDetection } from '../../helpers/custom-hooks';
import { useEffect } from 'react';
import UserOptions from '../UserOptions/UserOptions';
import { useUser } from '../../context/UserContext';
import { logout } from '../../services/user-services';
import { useAuth } from '../../context/AuthContext';
import { removeToken } from '../../utils/token-helper';
import './Navbar.css';

export default function Navbar({ user }) {
	const navigate = useNavigate();
	const { handleLogout: onLogout } = useAuth();
	const [showUserOptions, setShowUserOptions] = useState(false);

	const handleLogout = async (e) => {
		e.preventDefault();
		await logout().then(() => {
			onLogout();
			removeToken();
			navigate('/login');
		});
	};

	const toggleUserOptions = (e) => {
		e.preventDefault();

		setShowUserOptions(!showUserOptions);
	};

	const isMobile = useMobileDetection();

	return (
		<>
			<nav className='navbar'>
				<Link to='/' className='navbar-logo'>
					{/* <a className="navbar-logo"> */}
					<i className='material-symbols-outlined'>task_alt</i>
					{/* </a> */}
					TODO LIST
				</Link>

				{/* <div className="navbar-options"> */}
				<a className='navbar-user' aria-label={'User options:' + user?.name} href='#' onClick={toggleUserOptions}>
					<img className='navbar-user-img' src={images.user} alt='user' />
					{/* <p className="navbar-user-name">Hi {userName}!</p> */}
				</a>
				{/* <button className="navbar-logout app__button" onClick={handleLogout}>
            {isMobile ? (
              <i className="material-symbols-outlined">logout</i>
            ) : (
              "Logout"
            )}
          </button> */}

				{/* </div> */}
				{showUserOptions && (
					<UserOptions userName={user?.name} userEmail={user?.email} handleLogout={handleLogout} />
				)}
			</nav>
		</>
	);
}
