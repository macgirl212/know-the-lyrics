import styles from '../styles/Game.module.scss';

import AnswerInput from './AnswerInput';
import ConfirmedLyricsBanner from './ConfirmedLyricsBanner';
import PrevLyricsBanner from './PrevLyricsBanner';

type GameScreenProps = {
	currentLyrics: string;
	isAnswerToFill: boolean;
	isEndOfSong: boolean;
	lyricIndex: number;
	lyrics: Array<string>;
	revealAnswer: any;
	splitIndex: number;
	setUserInput: any;
	typeOfLyrics: string;
	userInput: string;
};

const GameScreen = ({
	currentLyrics,
	isAnswerToFill,
	isEndOfSong,
	lyricIndex,
	lyrics,
	revealAnswer,
	splitIndex,
	setUserInput,
	typeOfLyrics,
	userInput,
}: GameScreenProps) => {
	return (
		<div className={styles.gameContainer}>
			<PrevLyricsBanner
				isEndOfSong={isEndOfSong}
				lyricIndex={lyricIndex}
				lyrics={lyrics}
				typeOfLyrics={typeOfLyrics}
			/>
			{isAnswerToFill ? (
				<AnswerInput
					currentLyrics={currentLyrics}
					revealAnswer={revealAnswer}
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
