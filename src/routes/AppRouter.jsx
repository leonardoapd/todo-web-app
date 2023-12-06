import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import { useAuth } from '../context/AuthContext';
import { UserProvider } from '../context/UserContext';
import Layout from '../pages/Layout';

export default function AppRouter() {
	const { isLoggedIn } = useAuth();

	return (
		<BrowserRouter>
			<UserProvider>
				<Layout>
					<Routes>
						{isLoggedIn ? (
							<Route path='/*' element={<PrivateRoutes />} />
						) : (
							<Route path='/*' element={<PublicRoutes />} />
						)}
					</Routes>
				</Layout>
			</UserProvider>
		</BrowserRouter>
	);
}
