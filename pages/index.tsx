import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import populate from '../controllers/populate';

const Home: NextPage = () => {
	/* this function is used to populate database from external json file; only uncomment when adjusting database */
	// populate();

	return (
		<main className={styles.mainContainer}>
			<h1 className={styles.title}>Know the Lyrics</h1>
			<Link href="/select">
				<a className={styles.mainButton}>Play</a>
			</Link>
		</main>
	);
};

export default Home;
