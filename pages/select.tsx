import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect } from 'react';
import useGlobalStates from '../AppContext';
import getAllSongs from '../controllers/getSongs';
import Title from '../components/Title';
import DifficultyButton from '../components/DifficultyButton';

const SelectSongPage: NextPage = () => {
	// @ts-ignore
	const { currentSong, selectASong } = useGlobalStates();

	useEffect(() => {
		getAllSongs().then(function (result) {
			const randomSong = result[Math.floor(Math.random() * result.length)];
			selectASong(randomSong);
		});
	}, []);

	return (
		<>
			<Title title={currentSong.title} />
			<main>
				<DifficultyButton
					difficulty="Easy"
					hasChorus={currentSong.hasChorus}
					verses={currentSong.verses.length}
				/>
				<br />
				<DifficultyButton
					difficulty="Hard"
					hasChorus={currentSong.hasChorus}
					verses={currentSong.verses.length}
				/>
				<br />
				<br />
				<Link href="/scores">
					<a>Abandon Game</a>
				</Link>
			</main>
		</>
	);
};

export default SelectSongPage;
