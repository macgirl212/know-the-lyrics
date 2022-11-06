import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getOneSong } from '../controllers/getSongs';
import styles from '../styles/Game.module.scss';

const Game: NextPage = () => {
	const id = sessionStorage.getItem('id');
	const difficulty = sessionStorage.getItem('difficulty');

	// song info states
	const [answer, setAnswer] = useState<string>('');
	const [lyrics, setLyrics] = useState<string[]>([]);
	const [songTitle, setSongTitle] = useState<string>('');
	const [songUrl, setSongUrl] = useState<string>('');
	const [timestamps, setTimestamps] = useState<string[]>([]);

	// game states
	const [currentLyrics, setCurrentLyrics] = useState<string>('');
	const [isAnswerToFill, setIsAnswerToFill] = useState<boolean>(false);
	const [typeOfLyrics, setTypeOfLyrics] = useState<string>('neutral');
	const [lyricIndex, setLyricIndex] = useState<number>(0);
	const [userInput, setUserInput] = useState<string>('');

	useEffect(() => {
		// initial setup for current song
		getOneSong(id).then((result) => {
			setSongTitle(result.title);
			setSongUrl(result.url);
			setLyrics(result.lyrics[0].firstVerse);
			replaceLyricWithBlanks(result.lyrics[0].firstVerse);
			setTimestamps(result.timestamps);
		});
	}, []);

	const replaceLyricWithBlanks = (lyrics: Array<string>) => {
		// store correct answer
		let lastLineIndex = Math.floor(
			Math.random() *
				(lyrics.length >= 4
					? lyrics.length - 1
					: lyrics.length >= 8
					? lyrics.length - 8
					: 11) +
				5
		);
		if (lastLineIndex > lyrics.length) {
			lastLineIndex = lyrics.length - 1;
		}

		const correctAnswer = lyrics[lastLineIndex];

		setAnswer(correctAnswer);
		// regex captures all but first word
		const blankLyricsRegex = /(^\S*\s*)?\S/g;

		const blankLyrics = correctAnswer
			.toString()
			.replace(blankLyricsRegex, `$1_`);

		lyrics.splice(lastLineIndex, 1, blankLyrics);
	};

	const timeUpdate = (e: any) => {
		const currentTime = e.target.currentTime;

		// dynamically change visible lyrics from current time
		if (currentTime > timestamps[lyricIndex]) {
			setCurrentLyrics(lyrics[lyricIndex]);
			setLyricIndex(lyricIndex + 1);
		}
	};

	const revealAnswer = () => {
		if (isAnswerToFill == false) {
			// render input to fill user's answer
			setIsAnswerToFill(true);
		} else {
			// compare if user input is the correct answer
			const formattedAnswer = answer.replace(/[^\w +-]/g, '');
			const userFormattedAnswer = `${currentLyrics.split(' ')[0]} ${userInput}`;
			if (formattedAnswer == userFormattedAnswer) {
				setTypeOfLyrics('correct');
			} else {
				setTypeOfLyrics('incorrect');
			}

			setCurrentLyrics(answer);
			setIsAnswerToFill(false);
		}
	};

	const handleChange = (event: any) => {
		setUserInput(event.target.value);
	};

	return (
		<main className={styles.mainContainer}>
			<h1>{songTitle}</h1>
			<audio src={songUrl} onTimeUpdate={(e) => timeUpdate(e)} controls />
			{isAnswerToFill ? (
				<div className={styles.inputDiv}>
					<h2 className={styles.confirmedLyrics}>
						{currentLyrics.split(' ')[0]}
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
					{typeOfLyrics === 'correct' ? (
						<h2 className={`${styles.currentLyrics} ${styles.correctLyrics}`}>
							{currentLyrics}
						</h2>
					) : typeOfLyrics === 'incorrect' ? (
						<h2 className={`${styles.currentLyrics} ${styles.incorrectLyrics}`}>
							{currentLyrics}
						</h2>
					) : (
						<h2 className={`${styles.currentLyrics} ${styles.neutralLyrics}`}>
							{currentLyrics}
						</h2>
					)}
				</>
			)}
			<div className={styles.gameButtonsDiv}>
				<button className={styles.gameButtons} onClick={revealAnswer}>
					Submit Answer
				</button>
				<Link href="/select">
					<a className={styles.gameButtons}>Next Song</a>
				</Link>
				<Link href="/scores">
					<a className={styles.gameButtons}>Abandon Game</a>
				</Link>
			</div>
		</main>
	);
};

export default Game;
