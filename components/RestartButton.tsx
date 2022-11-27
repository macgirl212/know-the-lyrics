import styles from '../styles/Game.module.scss';

type RestartButtonProps = {
	restartSong: any;
	typeOfLyrics: string;
};

const RestartButton = ({ restartSong, typeOfLyrics }: RestartButtonProps) => {
	return (
		<>
			{typeOfLyrics === 'final answer' ? null : (
				<div className={styles.restartButton}>
					<button onClick={restartSong}>Restart</button>
				</div>
			)}
		</>
	);
};

export default RestartButton;
