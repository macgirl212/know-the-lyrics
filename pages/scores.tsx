import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.scss';
import useGlobalStates from '../context/AppContext';

const Scores: NextPage = () => {
	const { score } = useGlobalStates();
	return (
		<main className={styles.mainContainer}>
			<h1 className={styles.scoreLabel}>Score:</h1>
			<h2 className={styles.score}>{score}</h2>
			<Link href="/">
				<a className={styles.mainButton}>Play again</a>
			</Link>
		</main>
	);
};

export default Scores;
