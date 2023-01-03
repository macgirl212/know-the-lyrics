import Link from 'next/link';
import useGlobalStates from '../../context/AppContext';
import styles from '../../styles/Game.module.scss';

const AbandonGameButton = () => {
	// @ts-ignore
	const { prevPlayedSongs, selectDifficulty } = useGlobalStates();

	return (
		<>
			{prevPlayedSongs.length >= 5 ? null : (
				<Link href="/scores">
					<a
						onClick={() => {
							selectDifficulty('');
						}}
						className={styles.gameButtons}
					>
						Abandon Game
					</a>
				</Link>
			)}
		</>
	);
};

export default AbandonGameButton;
