import {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/NavBarMobile.module.scss';
import {fetchGamesGamecube} from '@/pages/api/games';

export default function NavBarMobile({children}) {
	const [showSearch, setShowSearch] = useState(false);
	const [value, setValue] = useState('');
	const [games, setGames] = useState([]);

	const handleSearchClick = () => {
		setShowSearch(!showSearch);
	};

	function handleChange(event) {
		setValue(event.target.value);
		requestForFilteredGames(event.target.value);
	}

	async function requestForFilteredGames(gameSearched) {
		try {
			const response = await fetchGamesGamecube();
			const gamesData = response.results ?? [];
			console.log('api response:', response);
			const searchGamesFiltered = gamesData.filter((game) => {
				const gamesToLowerCase = game.name.toLowerCase();
				return gamesToLowerCase.includes(gameSearched.toLowerCase());
			});

			setGames(searchGamesFiltered);
		} catch (error) {
			console.error(error);
		}
	}

	console.log('games state:', games);
	return (
		<div className={styles.NavBarMobileWrapper}>
			{children}
			<div className={styles.NavBarMobile}>
				{showSearch && (
					<div className={styles.searchBar}>
						<input type='search' value={value} onChange={handleChange} placeholder='Rechercher...' />
					</div>
				)}
				<nav className={styles.showMenu}>
					<Link href='/'>
						<Image src='/icon-home-gameboy.svg' alt='home icon' width={50} height={50} />
					</Link>
					<Link href='/Register'>
						<Image src='/user-register2.svg' alt='icon register' width={60} height={60} />
					</Link>
					<div onClick={handleSearchClick} className={styles.searchIcon}>
						<Image src='/search-icon.svg' alt='icon search' width={50} height={50} />
					</div>
					<Link href='/About'>
						<Image src='/about-icon.svg' alt='icon about' width={50} height={50} />
					</Link>
				</nav>
			</div>
		</div>
	);
}
