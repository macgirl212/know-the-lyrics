import styles from '../styles/Game.module.scss';
import useGlobalStates from '../AppContext';

type GameScoreProps = {
	possibleScore: number;
	typeOfLyrics: string;
};

const GameScore = ({ possibleScore, typeOfLyrics }: GameScoreProps) => {
	const { score } = useGlobalStates();
	return (
		<div className={styles.gameScore}>
			<h3>Score:</h3>
			{typeOfLyrics === 'final answer' ? (
				<p className={styles.adjustedScoreNumber}>{score}</p>
			) : (
				<p className={styles.scoreNumber}>{score}</p>
			)}
			{typeOfLyrics === 'final answer' ? null : (
				<p className={styles.possibleScore}>+ {possibleScore}</p>
			)}
		</div>
	);
};

export default GameScore;
