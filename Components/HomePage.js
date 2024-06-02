import Link from 'next/link';
import styles from '../styles/HomePage.module.scss';
import {fetchGamesGamecube} from '../pages/api/games.js';
import {useEffect, useState} from 'react';

export default function HomePage() {
	const [games, setGames] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				console.log('Fetching games...');
				const gamesData = await fetchGamesGamecube(105);
				console.log('Games data', gamesData);
				setGames(gamesData);
				console.log('gamesData', fetchGamesGamecube);
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
						<div className={styles.card} key={game.count}>
							{game.name}
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
