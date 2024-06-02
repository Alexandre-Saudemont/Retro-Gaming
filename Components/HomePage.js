import Link from 'next/link';
import styles from '../styles/HomePage.module.scss';

export default function HomePage() {
	return (
		<>
			<main className={styles.HomePage}>
				<h1>Retro Gaming</h1>
				<section className={styles['HomePage-titleContainer']}>
					<p>Bienvenue sur Retro Gaming, un site pour répertorier les jeux rétro, principalement Nintendo & Sony</p>
				</section>
				<Link href='/Register'>Register</Link>
				<section className={styles['HomePage-cardsContainer']}>
					<div className={styles.card}>Jeu 1</div>
					<div className={styles.card}>Jeu 2</div>
					<div className={styles.card}>Jeu 3</div>
					<div className={styles.card}>Jeu 4</div>
				</section>
			</main>
		</>
	);
}
