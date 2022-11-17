import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import chooseLastLineIndex from '../controllers/chooseLastLineIndex';
import convertWordsToBlanks from '../controllers/convertWordsToBlanks';
import validateAnswer from '../controllers/validateAnswer';
import { getOneSong } from '../controllers/getSongs';
import styles from '../styles/Game.module.scss';

import Title from '../components/Title';

const Game: NextPage = () => {
	const id = sessionStorage.getItem('id');
	const difficulty = sessionStorage.getItem('difficulty');
	const selectedSection = Number(sessionStorage.getItem('selectedSection'));

	// song info states
	const [answer, setAnswer] = useState<string>('');
	const [lyrics, setLyrics] = useState<string[]>([]);
	const [section, setSection] = useState<string>('');
	const [songTitle, setSongTitle] = useState<string>('');
	const [songUrl, setSongUrl] = useState<string>('');
	const [timestamps, setTimestamps] = useState<string[]>([]);

	// game states
	const [currentLyrics, setCurrentLyrics] = useState<string>('');
	const [isAnswerToFill, setIsAnswerToFill] = useState<boolean>(false);
	const [isEndOfSong, setIsEndOfSong] = useState<boolean>(false);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [lyricIndex, setLyricIndex] = useState<number>(0);
	const [splitIndex, setSplitIndex] = useState<number>(
		difficulty === 'easy' ? -3 : 1
	);
	const [typeOfLyrics, setTypeOfLyrics] = useState<string>('neutral');
	const [userInput, setUserInput] = useState<string>('');

	const audioRef = useRef(new Audio());

	useEffect(() => {
		// initial setup for current song
		getOneSong(id)
			.then((result) => {
				setSongTitle(result.title);
				setSongUrl(result.url);

				if (selectedSection !== -1) {
					// if a verse is selected, load the appropriate data
					setLyrics(result.verses[selectedSection]);
					replaceLyricWithBlanks(result.verses[selectedSection], difficulty);
					setTimestamps(result.verseTimestamps[selectedSection]);

					if (selectedSection === 0) {
						// if the first verse is selected, start the audio from the beginning
						audioRef.current.currentTime = 0;
					} else {
						// if another verse is selected, start the audio five seconds before the first lyric
						audioRef.current.currentTime =
							result.verseTimestamps[selectedSection][0] - 5;
					}
				} else {
					// if the chorus is selected, start the audio five seconds before the first lyric
					setLyrics(result.chorus);
					replaceLyricWithBlanks(result.chorus, difficulty);
					setTimestamps(result.chorusTimestamps);
					audioRef.current.currentTime = result.chorusTimestamps[0] - 5;
				}
				setSubtitle();
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

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

		// convert some words in selected line to blanks
		const blankLyrics = convertWordsToBlanks(correctAnswer, splitIndex);

		// splice lyrics array at chosen index and insert the chosen line
		lyrics.splice(lastLineIndex);
		lyrics.push(blankLyrics);
	};

	const togglePlay = () => {
		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
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

	const revealAnswer = () => {
		if (isAnswerToFill == false) {
			// render input to fill user's answer
			setIsAnswerToFill(true);
		} else {
			const finalAnswer = validateAnswer(
				answer,
				currentLyrics,
				splitIndex,
				userInput
			);

			setTypeOfLyrics('final answer');
			setCurrentLyrics(finalAnswer);
			setIsAnswerToFill(false);
		}
	};

	const handleChange = (event: any) => {
		setUserInput(event.target.value);
	};

	return (
		<>
			<Title title={songTitle} />
			<main className={styles.mainContainer}>
				<h2>{section}</h2>
				<audio
					src={songUrl}
					onPlay={() => {
						setIsPlaying(true);
					}}
					onTimeUpdate={(e) => timeUpdate(e)}
					ref={audioRef}
				/>
				{isAnswerToFill ? (
					<div className={styles.inputDiv}>
						<h2 className={styles.confirmedLyrics}>
							{currentLyrics.split(' ').slice(0, splitIndex).join(' ')}
						</h2>
						<input
							type="text"
							className={styles.missingLyrics}
							onChange={handleChange}
							value={userInput}
						/>
					</div>
				) : (
					<>
						{typeOfLyrics === 'final answer' ? (
							<h2
								className={styles.currentLyrics}
								dangerouslySetInnerHTML={{ __html: currentLyrics }}
							/>
						) : (
							<h2 className={`${styles.currentLyrics} ${styles.neutralLyrics}`}>
								{currentLyrics}
							</h2>
						)}
					</>
				)}
				<div className={styles.gameButtonsDiv}>
					{typeOfLyrics === 'final answer' ? null : (
						<>
							{isEndOfSong ? (
								<button className={styles.gameButtons} onClick={revealAnswer}>
									Submit Answer
								</button>
							) : (
								<button className={styles.gameButtons} onClick={togglePlay}>
									{isPlaying ? 'Pause' : 'Play'}
								</button>
							)}
						</>
					)}
					<Link href="/select">
						<a className={styles.gameButtons}>Next Song</a>
					</Link>
					<Link href="/scores">
						<a className={styles.gameButtons}>Abandon Game</a>
					</Link>
				</div>
			</main>
		</>
	);
};

export default Game;
