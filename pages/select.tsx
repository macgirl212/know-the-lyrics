import type { NextPage } from 'next';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getAllSongs } from '../controllers/getSongs';

const SelectSongPage: NextPage = () => {
	const [chosenSong, setChosenSong] = useState<string>('');
	const [chosenSongVerses, setChosenSongVerses] = useState(0);
	const [chosenSongHasChorus, setChosenSongHasChorus] = useState<boolean>();

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
		<main>
			<h1>{chosenSong}</h1>
			<Link href="/game">
				<a
					onClick={() => {
						let selectedSection = 0;
						if (chosenSongHasChorus) {
							selectedSection = Math.floor(Math.random()) - 1;
						}
						sessionStorage.setItem('difficulty', 'easy');
						sessionStorage.setItem(
							'selectedSection',
							selectedSection.toString()
						);
					}}
				>
					Easy
				</a>
			</Link>
			<br />
			<Link href="/game">
				<a
					onClick={() => {
						let selectedSection = Math.floor(Math.random() * chosenSongVerses);
						if (chosenSongHasChorus) {
							selectedSection -= 1;
						}
						sessionStorage.setItem('difficulty', 'hard');
						sessionStorage.setItem(
							'selectedSection',
							selectedSection.toString()
						);
					}}
				>
					Hard
				</a>
			</Link>
			<br />
			<br />
			<Link href="/scores">
				<a>Abandon Game</a>
			</Link>
		</main>
	);
};

export default SelectSongPage;
