import styles from '../styles/Game.module.scss';

import AnswerInput from './AnswerInput';
import ConfirmedLyricsBanner from './ConfirmedLyricsBanner';

type GameScreenProps = {
	currentLyrics: string;
	isAnswerToFill: boolean;
	splitIndex: number;
	setUserInput: any;
	typeOfLyrics: string;
	userInput: string;
};

const GameScreen = ({
	currentLyrics,
	isAnswerToFill,
	splitIndex,
	setUserInput,
	typeOfLyrics,
	userInput,
}: GameScreenProps) => {
	return (
		<div className={styles.gameContainer}>
			{/* possible area for previous line of lyrics */}
			{isAnswerToFill ? (
				<AnswerInput
					currentLyrics={currentLyrics}
					splitIndex={splitIndex}
					userInput={userInput}
					setUserInput={setUserInput}
				/>
			) : (
				<ConfirmedLyricsBanner
					currentLyrics={currentLyrics}
					typeOfLyrics={typeOfLyrics}
				/>
			)}
		</div>
	);
};

export default GameScreen;