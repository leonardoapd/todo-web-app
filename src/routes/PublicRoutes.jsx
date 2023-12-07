import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import Home from '../pages/Home/Home';

export default function PublicRoutes() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='login' element={<Login />} />
			<Route path='signup' element={<SignUp />} />

			<Route path='*' element={<Navigate to='/' replace />} />
		</Routes>
	);
}
