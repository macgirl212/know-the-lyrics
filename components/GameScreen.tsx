import styles from '../styles/Game.module.scss';

import AnswerInput from './AnswerInput';
import ConfirmedLyricsBanner from './ConfirmedLyricsBanner';
import PrevLyricsBanner from './PrevLyricsBanner';

type GameScreenProps = {
	currentLyrics: string;
	errorMessage: string;
	isAnswerToFill: boolean;
	isEndOfSong: boolean;
	lyricIndex: number;
	lyrics: Array<string>;
	revealAnswer: any;
	setErrorMessage: any;
	setUserInput: any;
	splitIndex: number;
	typeOfLyrics: string;
	userInput: string;
};

const GameScreen = ({
	currentLyrics,
	errorMessage,
	isAnswerToFill,
	isEndOfSong,
	lyricIndex,
	lyrics,
	revealAnswer,
	setErrorMessage,
	setUserInput,
	splitIndex,
	typeOfLyrics,
	userInput,
}: GameScreenProps) => {
	return (
		<div className={styles.gameContainer}>
			<PrevLyricsBanner
				errorMessage={errorMessage}
				isEndOfSong={isEndOfSong}
				lyricIndex={lyricIndex}
				lyrics={lyrics}
				setErrorMessage={setErrorMessage}
				typeOfLyrics={typeOfLyrics}
			/>
			{isAnswerToFill ? (
				<AnswerInput
					isAnswerToFill={isAnswerToFill}
					currentLyrics={currentLyrics}
					revealAnswer={revealAnswer}
					splitIndex={splitIndex}
					userInput={userInput}
					setUserInput={setUserInput}
				/>
			) : (
				<ConfirmedLyricsBanner
					currentLyrics={currentLyrics}
					isEndOfSong={isEndOfSong}
					revealAnswer={revealAnswer}
					typeOfLyrics={typeOfLyrics}
				/>
			)}
		</div>
	);
};

export default GameScreen;
