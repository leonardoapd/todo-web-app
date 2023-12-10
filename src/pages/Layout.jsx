import Navbar from '../components/Navbar/Navbar';
import { Toaster } from 'react-hot-toast';

export default function Layout({ children }) {
	return (
		<>
			<Navbar />
			{children}
			<Toaster position='bottom-center' reverseOrder={false} />
		</>
	);
}
