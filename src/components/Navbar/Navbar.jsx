import { useNavigate, Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { images } from '../../constants';
import { useMobileDetection } from '../../helpers/custom-hooks';
import { useUser } from '../../context/UserContext';
import { logout } from '../../services/user-services';
import { useAuth } from '../../context/AuthContext';
import { removeToken } from '../../utils/token-helper';
import './Navbar.css';
import UserOptions from '../UserOptions/UserOptions';

export default function Navbar() {
	const navigate = useNavigate();
	const { handleLogout: onLogout, isLoggedIn } = useAuth();
	const [showUserOptions, setShowUserOptions] = useState(false);
	const { user, getUserInfo } = useUser();

	const handleLogout = async (e) => {
		e.preventDefault();
		await logout().then(() => {
			onLogout();
			removeToken();
			setShowUserOptions(false);
			navigate('/login');
		});
	};

	const toggleUserOptions = () => {
		setShowUserOptions(!showUserOptions);
	};

	const closeUserOptions = () => {
		setShowUserOptions(false);
	};

	const isMobile = useMobileDetection();

	// Agrega useRef para obtener una referencia al contenedor principal del Navbar
	const navbarRef = useRef(null);

	// Agrega useEffect para añadir un manejador de eventos global que escucha clics fuera de UserOptions
	useEffect(() => {
		if(isLoggedIn) {
			getUserInfo();
		}
		const handleClickOutside = (event) => {
			if (navbarRef.current && !navbarRef.current.contains(event.target)) {
				closeUserOptions();
			}
		};

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [navbarRef, isLoggedIn]);

	return (
		<>
			<nav ref={navbarRef} className='navbar'>
				<Link to='/' className='navbar-logo'>
					<i className='material-symbols-outlined'>task_alt</i>
					Tasky
				</Link>

				{!isLoggedIn && (
					<div className='navbar-links'>
						<Link to='/login' className='navbar-link app__button primary-button'>
							Login
						</Link>
						<Link to='/signup' className='navbar-link app__button secondary-button'>
							Sign up
						</Link>
					</div>
				)}

				{isLoggedIn && (
					<a
						className='navbar-user'
						aria-label={'User options:' + user?.name}
						href='#'
						onClick={toggleUserOptions}
					>
						<img className='navbar-user-img' src={images.user} alt='user' />
					</a>
				)}

				{showUserOptions && (
					<UserOptions userName={user?.name} userEmail={user?.email} handleLogout={handleLogout} />
				)}
			</nav>
		</>
	);
}
