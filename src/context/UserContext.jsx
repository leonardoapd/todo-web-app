import { createContext, useContext, useState, useEffect } from 'react';
import { getUser } from '../services/user-services';
import { removeToken } from '../utils/token-helper';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export function UserProvider({ children }) {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		getUserInfo();
	}, []);

	const editUser = (newUser) => {
		setUser(newUser);
	};

	const getUserInfo = async () => {
		getUser()
			.then((user) => {
				setUser(user);
			})
			.catch((error) => {
				console.log('Error', error);
				removeToken();
				navigate('/');
			});
	};

	const getUserEmail = () => {
		return user?.email;
	};

	return (
		<UserContext.Provider value={{ user, editUser, getUserInfo, getUserEmail }}>
			{children}
		</UserContext.Provider>
	);
}

export function useUser() {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
}
