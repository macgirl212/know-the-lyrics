import { useEffect, useState } from 'react';
import styles from '../styles/Game.module.scss';

import AnswerInput from './AnswerInput';
import ConfirmedLyricsBanner from './ConfirmedLyricsBanner';

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
	const [prevLyrics, setPrevLyrics] = useState<string>('');
	useEffect(() => {
		if (isEndOfSong) {
			setTimeout(() => {
				setPrevLyrics(lyrics[lyricIndex - 2]);
			}, 5000);
		} else {
			setPrevLyrics('');
		}
	}),
		[isEndOfSong];
	return (
		<div className={styles.gameContainer}>
			{isAnswerToFill ? (
				<AnswerInput
					currentLyrics={currentLyrics}
					revealAnswer={revealAnswer}
					splitIndex={splitIndex}
					userInput={userInput}
					setUserInput={setUserInput}
				/>
			) : (
				<>
					{isEndOfSong && typeOfLyrics !== 'final answer' ? (
						<p className={styles.prevLyrics}>{prevLyrics}</p>
					) : null}
					<ConfirmedLyricsBanner
						currentLyrics={currentLyrics}
						typeOfLyrics={typeOfLyrics}
					/>
				</>
			)}
		</div>
	);
};

export default GameScreen;
