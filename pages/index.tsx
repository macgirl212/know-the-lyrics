import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
	return (
		<>
			<header>
				<h1 className={styles.title}>Know the Lyrics</h1>
			</header>
			<main className={styles.mainContainer}>
				<Link href="/select">
					<a className={styles.mainButton}>Play</a>
				</Link>
			</main>
		</>
	);
};

export default Home;
