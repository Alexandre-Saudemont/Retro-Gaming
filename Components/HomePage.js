import Link from 'next/link';
import styles from '../styles/HomePage.module.scss';
import Image from 'next/image';
import {fetchGamesGamecube} from '../pages/api/games.js';
import {useEffect, useState} from 'react';

export default function HomePage() {
	const [games, setGames] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [totalPages, setTotalPages] = useState(0);

	const gamesPerPage = 20;

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				console.log('Fetching games for page:', page);
				const gamesData = await fetchGamesGamecube(105, page);
				console.log('Games data:', gamesData);

				// Vérification de la structure des données reçues
				if (gamesData && Array.isArray(gamesData)) {
					const totalCount = gamesData.length;
					const totalPagesCount = Math.ceil(totalCount / gamesPerPage);

					setTotalPages(totalPagesCount);

					// Sélectionner les jeux pour la page courante
					const startIndex = (page - 1) * gamesPerPage;
					const selectedGames = gamesData.slice(startIndex, startIndex + gamesPerPage);

					setGames(selectedGames);
				} else {
					console.error('Games data is not in expected format or empty:', gamesData);
					setGames([]);
					setTotalPages(0);
				}
			} catch (error) {
				console.error('Error fetching games data:', error);
				setGames([]);
				setTotalPages(0);
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, [page]);

	function handlePageChange(pageNumber) {
		setPage(pageNumber);
		window.scrollTo({top: 0, behavior: 'smooth'});
	}
	function renderPageNumbers() {
		const pageNumbers = [];
		// Afficher les boutons de pagination pour chaque page jusqu'à totalPages
		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(
				<button key={i} onClick={() => handlePageChange(i)} className={`${styles.pageButton} ${page === i ? styles.active : ''}`}>
					{i}
				</button>,
			);
		}
		return pageNumbers;
	}

	return (
		<main className={styles.HomePage}>
			<h1>Retro Gaming</h1>
			<section className={styles['HomePage-titleContainer']}>
				<p className={styles.text}>Bienvenue sur Retro Gaming, un site pour répertorier les jeux rétro, principalement Nintendo & Sony</p>
			</section>
			<Link href='/Register'>Register</Link>
			<section className={styles['HomePage-cardsContainer']}>
				{games && games.length > 0 ? (
					games.map((game) => (
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
					))
				) : loading ? (
					<p>Loading...</p>
				) : (
					<p>No games available</p>
				)}
			</section>
			<div className={styles.paginationContainer}>{renderPageNumbers()}</div>
		</main>
	);
}
