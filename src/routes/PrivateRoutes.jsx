import { Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from '../context/UserContext';
import TodoHome from '../pages/TodoHome/TodoHome';

export default function PrivateRoutes() {
	return (
		<UserProvider>
			<Routes>
				<Route path='/mytodolist' element={<TodoHome />} />
				<Route path='*' element={<Navigate to='/mytodolist' replace />} />
			</Routes>
		</UserProvider>
	);
}
