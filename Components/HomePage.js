import Link from 'next/link';
import styles from '../styles/HomePage.module.scss';
import Image from 'next/image';
import {fetchGamesGamecube} from '../pages/api/games.js';
import {useEffect, useState} from 'react';

export default function HomePage() {
	const [games, setGames] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				console.log('Fetching games...');
				const gamesData = await fetchGamesGamecube(105, page);
				setGames((prevGames) => [...prevGames, ...gamesData]);
				console.log('Games data', gamesData);
				setGames(gamesData);
			} catch (error) {
				console.error('Error fetching games data:', error);
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, [page]);

	function loadMoreGames() {
		setPage((prevPage) => prevPage + 1);
		window.scrollTo({top: 0, behavior: 'smooth'});
	}

	function loadLessGames() {
		setPage((prevPage) => prevPage - 1);
		window.scrollTo({top: 0, behavior: 'smooth'});
	}
	return (
		<>
			<main className={styles.HomePage}>
				<h1>Retro Gaming</h1>
				<section className={styles['HomePage-titleContainer']}>
					<p className={styles.text}>Bienvenue sur Retro Gaming, un site pour répertorier les jeux rétro, principalement Nintendo & Sony</p>
				</section>
				<Link href='/Register'>Register</Link>
				<section className={styles['HomePage-cardsContainer']}>
					{games.map((game) => (
						<div className={styles.card} key={game.id}>
							{game.background_image && (
								<Image
									src={game.background_image}
									alt={`${game.name} background image`}
									width={300}
									height={150}
									priority={true}
									style={{width: '100%', height: 'auto'}}
								/>
							)}
							<h2 className={styles.cardTitle}>{game.name}</h2>
						</div>
					))}
				</section>
				{loading ? (
					<p>Loading...</p>
				) : (
					<>
						<Image
							src='../next-arrow.svg'
							alt='Page Suivante'
							onClick={loadMoreGames}
							className={styles.loadMoreButton}
							width={30}
							height={30}
						/>

						{page > 1 && (
							<Image
								src='../previous-arrow.svg'
								alt='Page Précédente'
								onClick={loadLessGames}
								className={styles.loadMoreButton}
								width={30}
								height={30}
							/>
						)}
					</>
				)}
			</main>
		</>
	);
}
