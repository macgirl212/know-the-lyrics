import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect } from 'react';
import useGlobalStates from '../AppContext';
import getAllSongs from '../controllers/getSongs';
import Title from '../components/Title';
import DifficultyButton from '../components/DifficultyButton';
import styles from '../styles/Home.module.scss';

const SelectSongPage: NextPage = () => {
	// @ts-ignore
	const { currentSong, prevPlayedSongs, selectASong } = useGlobalStates();

	useEffect(() => {
		getAllSongs().then((result) => {
			chooseRandomSong(result);
		});
	}, []);

	const chooseRandomSong = (result: any) => {
		const randomSong = result[Math.floor(Math.random() * result.length)];
		// if this song was not played before, select it
		// @ts-ignore
		if (!prevPlayedSongs.includes(randomSong.title)) {
			selectASong(randomSong);
			return;
		} else {
			chooseRandomSong(result);
		}
	};

	return (
		<>
			<Title title={currentSong.title} />
			<main className={styles.mainContainer}>
				<div className={styles.difficultyButtonsDiv}>
					<DifficultyButton
						difficulty="Easy"
						hasChorus={currentSong.hasChorus}
						verses={currentSong.verses.length}
					/>
					<DifficultyButton
						difficulty="Hard"
						hasChorus={currentSong.hasChorus}
						verses={currentSong.verses.length}
					/>
				</div>
				<Link href="/scores">
					<a>Abandon Game</a>
				</Link>
			</main>
		</>
	);
};

export default SelectSongPage;
