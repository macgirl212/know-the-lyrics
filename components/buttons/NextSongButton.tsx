import Link from 'next/link';
import useGlobalStates from '../../context/AppContext';
import styles from '../../styles/Game.module.scss';

const NextSongButton = () => {
	// @ts-ignore
	const { prevPlayedSongs, selectDifficulty } = useGlobalStates();

	return (
		<>
			{prevPlayedSongs.length >= 5 ? (
				<Link href="/scores">
					<a
						onClick={() => {
							selectDifficulty('');
						}}
						className={styles.gameButtons}
					>
						End Game
					</a>
				</Link>
			) : (
				<Link href="/select">
					<a
						onClick={() => {
							selectDifficulty('');
						}}
						className={styles.gameButtons}
					>
						Next Song
					</a>
				</Link>
			)}
		</>
	);
};

export default NextSongButton;
