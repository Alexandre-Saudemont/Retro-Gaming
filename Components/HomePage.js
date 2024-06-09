import Link from 'next/link';
import styles from '../styles/HomePage.module.scss';
import Image from 'next/image';
import {fetchGamesGamecube} from '../pages/api/games.js';
import {useEffect, useState} from 'react';

export default function HomePage() {
	const [games, setGames] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				console.log('Fetching games...');
				const gamesData = await fetchGamesGamecube(105, 25);
				console.log('Games data', gamesData);
				setGames(gamesData);
			} catch (error) {
				console.error('Error fetching games data:', error);
			}
		}

		fetchData();
	}, []);

	return (
		<>
			<main className={styles.HomePage}>
				<h1>Retro Gaming</h1>
				<section className={styles['HomePage-titleContainer']}>
					<p>Bienvenue sur Retro Gaming, un site pour répertorier les jeux rétro, principalement Nintendo & Sony</p>
				</section>
				<Link href='/Register'>Register</Link>
				<section className={styles['HomePage-cardsContainer']}>
					{games.map((game) => (
						<div className={styles.card} key={game.id}>
							{game.background_image && (
								<Image
									src={game.background_image}
									alt={`${game.name} backgrround image`}
									width={300}
									height={150}
									layout='responsive'
									priority
								/>
							)}
							<h2>{game.name}</h2>
						</div>
					))}
					<div className={styles.card}>Jeu 1</div>
					<div className={styles.card}>Jeu 2</div>
					<div className={styles.card}>Jeu 3</div>
					<div className={styles.card}>Jeu 4</div>
				</section>
			</main>
		</>
	);
}
