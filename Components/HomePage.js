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
				const data = await fetchGamesGamecube(105, page);
				console.log('Games data:', data);

				if (data && data.results && Array.isArray(data.results)) {
					const totalCount = data.count; // Nombre total de jeux
					const totalPagesCount = Math.ceil(totalCount / gamesPerPage);
					console.log('Total count:', totalCount);
					console.log('Total pages count:', totalPagesCount);

					setTotalPages(totalPagesCount);
					setGames(data.results);
				} else {
					console.error('Games data is not in expected format or empty:', data);
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

		// Nombre maximal de boutons de pagination à afficher
		const maxButtonsToShow = 5;

		// Calculer l'indice de début et de fin des boutons de pagination
		let start = Math.max(1, page - Math.floor(maxButtonsToShow / 2));
		let end = Math.min(totalPages, start + maxButtonsToShow - 1);

		// Ajuster l'indice de début si nécessaire pour afficher maxButtonsToShow boutons
		if (end - start + 1 < maxButtonsToShow) {
			start = Math.max(1, end - maxButtonsToShow + 1);
		}

		// Fonction pour générer un bouton de pagination cliquable
		const renderPageButton = (pageNumber) => (
			<a
				key={pageNumber}
				onClick={() => handlePageChange(pageNumber)}
				className={`${styles.pageButton} ${page === pageNumber ? styles.active : ''}`}>
				{pageNumber}
			</a>
		);

		// Bouton pour la première page
		if (start > 1) {
			pageNumbers.push(renderPageButton(1));
			if (start > 2) {
				pageNumbers.push(
					<span className={styles.pageButton} key='ellipsis-start'>
						...
					</span>,
				);
			}
		}

		// Boutons pour les pages intermédiaires
		for (let i = start; i <= end; i++) {
			pageNumbers.push(renderPageButton(i));
		}

		// Bouton pour la dernière page
		if (end < totalPages) {
			if (end < totalPages - 1) {
				pageNumbers.push(<span key='ellipsis-end'>...</span>);
			}
			pageNumbers.push(renderPageButton(totalPages));
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
						<div className={styles.card} key={game.slug}>
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
1;
