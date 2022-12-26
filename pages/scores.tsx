import type { NextPage } from 'next';
import Link from 'next/link';

// controllers
import formatScore from '../controllers/formatScore';

// reducers
import useGlobalStates from '../context/AppContext';

// styles
import styles from '../styles/Home.module.scss';

const Scores: NextPage = () => {
	const { score } = useGlobalStates();
	const displayedScore = formatScore(score);
	return (
		<main className={styles.mainContainer}>
			<h1 className={styles.scoreLabel}>Score:</h1>
			<h2 className={styles.score}>{displayedScore}</h2>
			<Link href="/">
				<a className={styles.mainButton}>Play again</a>
			</Link>
		</main>
	);
};

export default Scores;
