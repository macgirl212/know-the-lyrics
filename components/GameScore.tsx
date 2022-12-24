import styles from '../styles/Game.module.scss';
import useGlobalStates from '../AppContext';

type GameScoreProps = {
	possibleScore: number;
	typeOfLyrics: string;
};

const GameScore = ({ possibleScore, typeOfLyrics }: GameScoreProps) => {
	const { score } = useGlobalStates();
	let displayedScore = score.toString();
	if (displayedScore.length < 4) {
		for (let i = displayedScore.length; i < 4; i++) {
			displayedScore = '0' + displayedScore;
		}
	}

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
