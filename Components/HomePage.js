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
	const [menuOpen, setMenuOpen] = useState(false);

	const gamesPerPage = 10;

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				console.log('Fetching games for page:', page);
				const data = await fetchGamesGamecube(105, page);
				console.log('Games data:', data);

				if (data && data.results && Array.isArray(data.results)) {
					const totalCount = data.count;
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

		const maxButtonsToShow = 3;

		let start = Math.max(1, page - Math.floor(maxButtonsToShow / 2));
		let end = Math.min(totalPages, start + maxButtonsToShow - 1);

		if (end - start + 1 < maxButtonsToShow) {
			start = Math.max(1, end - maxButtonsToShow + 1);
		}

		const renderPageButton = (pageNumber) => (
			<a
				key={pageNumber}
				onClick={() => handlePageChange(pageNumber)}
				className={`${styles.pageButton} ${page === pageNumber ? styles.active : ''}`}>
				{pageNumber}
			</a>
		);

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

		for (let i = start; i <= end; i++) {
			pageNumbers.push(renderPageButton(i));
		}

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
			<header className={styles.header}>
				<div className={styles.burgerMenu} onClick={() => setMenuOpen(!menuOpen)}></div>
				<nav className={`${styles.showMenu}`}>
					<Link href='/' src="'/icon-home-gameboy.svg">
						<Image src='/icon-home-gameboy.svg' alt='home icon' width={50} height={50}></Image>
					</Link>
					<Link href='/Register' className={styles['HomePage-link']}>
						<Image src='/user-register2.svg' alt='icon register' width={60} height={60}></Image>
					</Link>
					<Link href='/About'>
						<Image src='/search-icon.svg' alt='icon about' width={50} height={50}></Image>
					</Link>
					<Link href='/About'>
						<Image src='/about-icon.svg' alt='icon about' width={50} height={50}></Image>
					</Link>
				</nav>
			</header>
			<h1>Retro Gaming</h1>
			<section className={styles['HomePage-titleContainer']}>
				<p className={styles.text}>Bienvenue sur Retro Gaming, un site pour répertorier les jeux rétro, principalement Nintendo & Sony</p>
			</section>

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
