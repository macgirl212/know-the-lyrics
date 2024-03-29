import type { NextPage } from 'next';
import { useEffect, useState, useRef } from 'react';

// components
import AbandonGameButton from '../components/buttons/AbandonGameButton';
import GameScore from '../components/GameScore';
import GameScreen from '../components/GameScreen';
import HiddenControls from '../components/HiddenControls';
import NextSongButton from '../components/buttons/NextSongButton';
import PlayPauseButton from '../components/buttons/PlayPauseButton';
import RestartButton from '../components/buttons/RestartButton';
import Title from '../components/Title';

// controllers
import adjustScore from '../controllers/adjustScore';
import adjustSplitIndex from '../controllers/adjustSplitIndex';
import chooseLastLineIndex from '../controllers/chooseLastLineIndex';
import convertWordsToBlanks from '../controllers/convertWordsToBlanks';
import selectScoreMultiplier from '../controllers/selectScoreMultiplier';
import setStartingTime from '../controllers/setStartingTime';
import setSubtitle from '../controllers/setSubtitle';
import validateAnswer from '../controllers/validateAnswer';

// reducer
import useGlobalStates from '../context/AppContext';

// styles
import styles from '../styles/Game.module.scss';

const Game: NextPage = () => {
	const {
		currentSong,
		difficulty,
		selectedSection,
		// @ts-ignore
		completeASong,
		// @ts-ignore
		addToScore,
	} = useGlobalStates();

	// song info states
	const [answer, setAnswer] = useState<string>('');
	const [lyrics, setLyrics] = useState<string[]>([]);
	const [section, setSection] = useState<string>('');
	const [startOfSection, setStartOfSection] = useState<number | undefined>(
		undefined
	);
	const [timestamps, setTimestamps] = useState<number[]>([]);

	// game states
	const [currentLyrics, setCurrentLyrics] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [isAnswerToFill, setIsAnswerToFill] = useState<boolean>(false);
	const [isEndOfSong, setIsEndOfSong] = useState<boolean>(false);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [lyricIndex, setLyricIndex] = useState<number>(0);
	const [possibleScore, setPossibleScore] = useState<number>(0);
	const [splitIndex, setSplitIndex] = useState<number>();
	const [typeOfLyrics, setTypeOfLyrics] = useState<string>('neutral');
	const [userInput, setUserInput] = useState<string>('');

	// ref for audio element
	const audioRef = useRef<HTMLAudioElement | undefined>(
		typeof Audio !== 'undefined' ? new Audio() : undefined
	);

	useEffect(() => {
		// initial setup for current song
		if (selectedSection !== -1) {
			// if a verse is selected, load the appropriate data
			setupSong(
				currentSong.verses[selectedSection],
				currentSong.verseTimestamps[selectedSection]
			);
		} else {
			// if the chorus is selected, load the appropriate data
			setupSong(currentSong.chorus, currentSong.chorusTimestamps);
		}

		// setup initial timestamps
		audioRef.current.currentTime = setStartingTime(
			currentSong,
			selectedSection,
			setStartOfSection
		);
		setSubtitle(selectedSection, setSection);
	}, []);

	useEffect(() => {
		// listens for keypresses to restart, play, and pause song and select input
		if (isAnswerToFill || typeOfLyrics === 'final answer') {
			return;
		}
		const handleKeyDown = (event: any) => {
			// "r" restarts song
			if (event.keyCode === 82) {
				restartSong();
			}

			// "p" toggles play and pause
			if (event.keyCode === 80) {
				togglePlay();
			}

			// "enter" selects input
			if (isEndOfSong && event.keyCode === 13) {
				revealAnswer();
			}
		};
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isAnswerToFill, isPlaying, typeOfLyrics]);

	useEffect(() => {
		if (typeOfLyrics === 'final answer') {
			completeASong(currentSong.title);
		}
	}, [typeOfLyrics]);

	const setupSong = (section: string[], timestamps: number[]) => {
		setLyrics(section);
		replaceLyricWithBlanks(section, difficulty);
		setTimestamps(timestamps);
	};

	const replaceLyricWithBlanks = (
		lyrics: Array<string>,
		difficulty: string
	) => {
		// store correct answer
		const lastLineIndex = chooseLastLineIndex(lyrics, difficulty);
		const correctAnswer = lyrics[lastLineIndex];
		setAnswer(correctAnswer);

		const adjustedSplitIndex = adjustSplitIndex(correctAnswer, difficulty);
		setSplitIndex(adjustedSplitIndex);

		// set possible score with chosen multiplier based on difficulty
		setPossibleScore(
			selectScoreMultiplier(correctAnswer, adjustedSplitIndex, difficulty)
		);

		// convert some words in selected line to blanks
		const blankLyrics = convertWordsToBlanks(correctAnswer, adjustedSplitIndex);

		// splice lyrics array at chosen index and insert the chosen line
		lyrics.splice(lastLineIndex);
		lyrics.push(blankLyrics);
	};

	const timeUpdate = (e: any) => {
		const currentTime = e.target.currentTime;

		// dynamically change visible lyrics from current time
		if (currentTime > timestamps[lyricIndex]) {
			setCurrentLyrics(lyrics[lyricIndex]);
			setLyricIndex(lyricIndex + 1);
		}

		// pauses the music at the last lyric
		if (currentTime > timestamps[lyrics.length - 1] + 1) {
			setIsEndOfSong(true);
			setIsPlaying(false);
			audioRef.current.pause();
		}
	};

	const restartSong = () => {
		audioRef.current.currentTime = startOfSection;
		audioRef.current.play();
		setCurrentLyrics('');
		setErrorMessage('');
		setIsAnswerToFill(false);
		setLyricIndex(0);
		setIsEndOfSong(false);
		setIsPlaying(true);
	};

	const togglePlay = () => {
		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	const revealAnswer = () => {
		if (isAnswerToFill == false) {
			// render input to fill user's answer
			setIsAnswerToFill(true);
		} else {
			const finalAnswer = validateAnswer(answer, splitIndex, userInput);

			// if an error appears, show error message
			if (finalAnswer.startsWith('Error: ')) {
				setErrorMessage(finalAnswer.split('Error: ')[1]);
				setIsAnswerToFill(false);
				setCurrentLyrics(lyrics[lyricIndex - 1]);
				return;
			}

			setTypeOfLyrics('final answer');
			setCurrentLyrics(finalAnswer);
			setIsAnswerToFill(false);

			// adjust score
			addToScore(adjustScore(difficulty, finalAnswer, possibleScore));
		}
	};

	return (
		<>
			<Title title={currentSong.title} />
			{/* <HiddenControls /> */}
			<main className={styles.mainContainer}>
				<h2 className={styles.subtitle}>{section}</h2>
				<audio
					src={currentSong.url}
					onPlay={() => {
						setIsPlaying(true);
					}}
					onTimeUpdate={(e) => timeUpdate(e)}
					ref={audioRef}
				/>
				{/* screen for lyrics */}
				<GameScreen
					currentLyrics={currentLyrics}
					errorMessage={errorMessage}
					isAnswerToFill={isAnswerToFill}
					isEndOfSong={isEndOfSong}
					lyricIndex={lyricIndex}
					lyrics={lyrics}
					revealAnswer={revealAnswer}
					setErrorMessage={setErrorMessage}
					setUserInput={setUserInput}
					splitIndex={splitIndex}
					typeOfLyrics={typeOfLyrics}
					userInput={userInput}
				/>
				{/* various game settings */}
				<RestartButton restartSong={restartSong} typeOfLyrics={typeOfLyrics} />
				<GameScore possibleScore={possibleScore} typeOfLyrics={typeOfLyrics} />
				<div className={styles.gameButtonsDiv}>
					<NextSongButton />
					{typeOfLyrics === 'final answer' ? null : (
						<>
							{isEndOfSong ? (
								<a className={styles.gameButtons} onClick={revealAnswer}>
									Submit Answer
								</a>
							) : (
								<PlayPauseButton
									isPlaying={isPlaying}
									togglePlay={togglePlay}
								/>
							)}
						</>
					)}
					<AbandonGameButton />
				</div>
			</main>
		</>
	);
};

export default Game;
