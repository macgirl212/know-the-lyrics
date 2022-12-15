import type { NextPage } from 'next';
import { useEffect, useState, useRef } from 'react';
import useGlobalStates from '../AppContext';
import adjustScore from '../controllers/adjustScore';
import adjustSplitIndex from '../controllers/adjustSplitIndex';
import chooseLastLineIndex from '../controllers/chooseLastLineIndex';
import convertWordsToBlanks from '../controllers/convertWordsToBlanks';
import validateAnswer from '../controllers/validateAnswer';
import styles from '../styles/Game.module.scss';

import AbandonGameButton from '../components/AbandonGameButton';
import GameScore from '../components/GameScore';
import GameScreen from '../components/GameScreen';
import NextSongButton from '../components/NextSongButton';
import PlayPauseButton from '../components/PlayPauseButton';
import RestartButton from '../components/RestartButton';
import Title from '../components/Title';

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
	const [timestamps, setTimestamps] = useState<string[]>([]);
	const [startOfSection, setStartOfSection] = useState<number>(0);
	const [section, setSection] = useState<string>('');

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

	const audioRef = useRef<HTMLAudioElement | undefined>(
		typeof Audio !== 'undefined' ? new Audio() : undefined
	);

	useEffect(() => {
		// initial setup for current song
		if (selectedSection !== -1) {
			// if a verse is selected, load the appropriate data
			setLyrics(currentSong.verses[selectedSection]);
			replaceLyricWithBlanks(currentSong.verses[selectedSection], difficulty);
			setTimestamps(currentSong.verseTimestamps[selectedSection]);

			if (selectedSection === 0) {
				// if the first verse is selected, start the audio from the beginning
				audioRef.current.currentTime = 0;
			} else {
				// if another verse is selected, start the audio five seconds before the first lyric
				setStartOfSection(currentSong.verseTimestamps[selectedSection][0] - 5);
				audioRef.current.currentTime =
					currentSong.verseTimestamps[selectedSection][0] - 5;
			}
		} else {
			// if the chorus is selected, start the audio five seconds before the first lyric
			setLyrics(currentSong.chorus);
			replaceLyricWithBlanks(currentSong.chorus, difficulty);
			setTimestamps(currentSong.chorusTimestamps);
			setStartOfSection(currentSong.chorusTimestamps[0] - 5);
			audioRef.current.currentTime = currentSong.chorusTimestamps[0] - 5;
		}
		setSubtitle();
	}, []);

	useEffect(() => {
		if (typeOfLyrics === 'final answer') {
			completeASong(currentSong.title);
		}
	}, [typeOfLyrics]);

	const setSubtitle = () => {
		switch (selectedSection) {
			case -1:
				setSection('Chorus');
				break;
			case 0:
				setSection('1st Verse');
				break;
			case 1:
				setSection('2nd Verse');
				break;
			case 2:
				setSection('3rd Verse');
				break;
		}
	};

	const replaceLyricWithBlanks = (lyrics: Array<string>, difficulty: any) => {
		// store correct answer
		const lastLineIndex = chooseLastLineIndex(lyrics, difficulty);
		const correctAnswer = lyrics[lastLineIndex];
		setAnswer(correctAnswer);

		const adjustedSplitIndex = adjustSplitIndex(correctAnswer, difficulty);
		setSplitIndex(adjustedSplitIndex);

		let baseScore =
			correctAnswer.split(' ').slice(adjustedSplitIndex).length * 100;
		if (difficulty === 'hard') {
			setPossibleScore(baseScore * 3);
		} else {
			setPossibleScore(baseScore);
		}

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
			const scoreToAdd = adjustScore(difficulty, finalAnswer, possibleScore);
			addToScore(scoreToAdd);
		}
	};

	return (
		<>
			<Title title={currentSong.title} />
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
									audioRef={audioRef}
									isPlaying={isPlaying}
									setIsPlaying={setIsPlaying}
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
