import type { NextPage } from 'next';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getAllSongs } from '../controllers/getSongs';
import Title from '../components/Title';
import DifficultyButton from '../components/DifficultyButton';

const SelectSongPage: NextPage = () => {
	const [chosenSong, setChosenSong] = useState<string>('');
	const [chosenSongVerses, setChosenSongVerses] = useState(0);
	const [chosenSongHasChorus, setChosenSongHasChorus] =
		useState<boolean>(false);

	useEffect(() => {
		getAllSongs().then(function (result) {
			const randomSong = result[Math.floor(Math.random() * result.length)];
			setChosenSong(randomSong.title);
			setChosenSongVerses(randomSong.verses.length);
			setChosenSongHasChorus(randomSong.hasChorus);
			sessionStorage.setItem('id', randomSong._id);
		});
	}, []);

	return (
		<>
			<Title title={chosenSong} />
			<main>
				<DifficultyButton
					difficulty="Easy"
					chosenSongHasChorus={chosenSongHasChorus}
					chosenSongVerses={chosenSongVerses}
				/>
				<br />
				<DifficultyButton
					difficulty="Hard"
					chosenSongHasChorus={chosenSongHasChorus}
					chosenSongVerses={chosenSongVerses}
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
