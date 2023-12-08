import { images } from '../../constants/index';
import { useNavigate } from 'react-router-dom';
import HomeInfo from '../../assets/data/home-data.json';
import { useState, useEffect } from 'react'; // Importa useState y useEffect
import './Home.css';

export default function Home() {
	const navigate = useNavigate();
	const homeInfo = HomeInfo.home_data;
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		// Establece un temporizador para cambiar la imagen cada 3 segundos (ajusta según sea necesario)
		const slideshowTimer = setInterval(() => {
			// Incrementa el índice de la imagen
			setCurrentIndex((prevIndex) => (prevIndex + 1) % homeInfo.length);
		}, 6000); // Cambia la imagen cada 3 segundos

		// Limpia el temporizador cuando el componente se desmonta o cuando cambia el índice de la imagen manualmente
		return () => clearInterval(slideshowTimer);
	}, [currentIndex, homeInfo.length]);

	return (
		<>
			<main className='home'>
				<section className='app__home-container'>
					{homeInfo.map((item, index) => (
						<div className={`home-item fade ${index === currentIndex ? 'active' : ''}`} key={index}>
							<h2 className='home-title'>{item.description}</h2>
							<img className='home-img' src={images[item.image]} alt={item.image} />
						</div>
					))}

					<button
						className='prev'
						onClick={() =>
							setCurrentIndex((prevIndex) => (prevIndex - 1 + homeInfo.length) % homeInfo.length)
						}
					>
						&#10094;
					</button>
					<button
						className='next'
						onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % homeInfo.length)}
					>
						&#10095;
					</button>
				</section>

				<div style={{ textAlign: 'center' }}>
					{homeInfo.map((item, index) => (
						<span
							className={`dot ${index === currentIndex ? 'active-dot' : ''}`}
							key={index}
							onClick={() => setCurrentIndex(index)}
						></span>
					))}
				</div>
			</main>
		</>
	);
}
