import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import styles from '../styles/Home.module.scss';
import useGlobalStates from '../context/AppContext';

const Home: NextPage = () => {
	// @ts-ignore
	const { resetGame } = useGlobalStates();

	useEffect(() => {
		resetGame();
	}, []);

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
