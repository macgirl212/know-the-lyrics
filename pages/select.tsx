import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// components
import DifficultyButton from '../components/buttons/DifficultyButton';
import HiddenControls from '../components/HiddenControls';
import Title from '../components/Title';

// controllers
import getAllSongs from '../controllers/getSongs';

// reducer
import useGlobalStates from '../context/AppContext';

// styles
import styles from '../styles/Home.module.scss';

interface Song {
	title: string;
	url: string;
	verses: string[][];
	chorus?: string[];
	bridge?: string[];
	ending?: string[];
	verseTimestamps: number[][];
	chorusTimestamps?: number[];
	bridgeTimetamps?: number[];
	endingTimestamps?: number[];
	hasChorus: boolean;
	hasBridge: boolean;
	hasEnding: boolean;
}

const SelectSongPage: NextPage = () => {
	// @ts-ignore
	const { currentSong, prevPlayedSongs, selectASong } = useGlobalStates();

	const [allSongs, setAllSongs] = useState<Song[]>();

	useEffect(() => {
		getAllSongs().then((result) => {
			setAllSongs(result);
			chooseRandomSong(result);
		});
	}, []);

	const chooseRandomSong = (result: Song[]) => {
		const randomSong: Song = result[Math.floor(Math.random() * result.length)];
		// if this song was not played before, select it
		if (!prevPlayedSongs.includes(randomSong.title)) {
			selectASong(randomSong);
			console.log(randomSong);
			return;
		} else {
			chooseRandomSong(result);
		}
	};

	return (
		<>
			<Title title={currentSong.title} />
			<HiddenControls allSongs={allSongs} />
			<main className={styles.mainContainer}>
				{currentSong.title === '' ? null : (
					<div className={styles.difficultyButtonsDiv}>
						<DifficultyButton
							difficulty="Easy"
							hasChorus={currentSong.hasChorus}
							verses={currentSong.verses.length}
						/>
						<DifficultyButton
							difficulty="Medium"
							hasChorus={currentSong.hasChorus}
							verses={currentSong.verses.length}
						/>
						<DifficultyButton
							difficulty="Hard"
							hasChorus={currentSong.hasChorus}
							verses={currentSong.verses.length}
						/>
					</div>
				)}
			</main>
		</>
	);
};

export default SelectSongPage;
