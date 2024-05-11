import {Inter} from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';
const inter = Inter({subsets: ['latin']});

export default function HomePage() {
	return (
		<>
			<main className={`${styles.main} ${inter.className}`}>
				<h1>Retro Gaming</h1>
				<Link href='/Register'>Register</Link>
			</main>
		</>
	);
}
