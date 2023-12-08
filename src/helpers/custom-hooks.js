import { useState, useEffect } from 'react';

export const useMobileDetection = () => {
	const mediaQuery = window.matchMedia('(max-width: 768px)');
	const [isMobile, setIsMobile] = useState(mediaQuery.matches);

	const handleResize = (e) => {
		setIsMobile(e.matches);
	};

	useEffect(() => {
		mediaQuery.addEventListener('change', handleResize);
		return () => {
			mediaQuery.removeEventListener('change', handleResize);
		};
	}, []);

	return isMobile;
};
