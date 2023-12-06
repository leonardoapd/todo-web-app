import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import TodoList from '../../components/TodoList/TodoList';
import { useUser } from '../../context/UserContext';

export default function TodoHome() {
	const { user, getUserInfo } = useUser();
	const [loading, setLoading] = useState(true);

  // Fetch user info on mount and set loading to false when done
	useEffect(() => {
		getUserInfo().finally(() => {
			setLoading(false);
		});
	}, []);

	return (
		<>
			<Navbar user={user} />
			{!loading && user && <TodoList user={user} />}
		</>
	);
}
