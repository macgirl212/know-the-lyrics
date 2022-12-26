// controllers
import formatScore from '../controllers/formatScore';

// reducer
import useGlobalStates from '../context/AppContext';

// styles
import styles from '../styles/Game.module.scss';

type GameScoreProps = {
	possibleScore: number;
	typeOfLyrics: string;
};

const GameScore = ({ possibleScore, typeOfLyrics }: GameScoreProps) => {
	const { score } = useGlobalStates();

	// always display four digits in score screen
	const displayedScore = formatScore(score);

	return (
		<div className={styles.gameScore}>
			<h3>Score:</h3>
			{typeOfLyrics === 'final answer' ? (
				<p className={`${styles.scoreNumber} ${styles.adjustedScoreNumber}`}>
					{displayedScore}
				</p>
			) : (
				<p className={styles.scoreNumber}>{displayedScore}</p>
			)}
			{typeOfLyrics === 'final answer' ? null : (
				<p className={styles.possibleScore}>+ {possibleScore}</p>
			)}
		</div>
	);
};

export default GameScore;
