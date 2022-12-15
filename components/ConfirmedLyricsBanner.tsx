import styles from '../styles/Game.module.scss';

type LyricProps = {
	currentLyrics: string;
	isEndOfSong: boolean;
	revealAnswer: any;
	typeOfLyrics: string;
};

const ConfirmedLyricsBanner = ({
	currentLyrics,
	isEndOfSong,
	revealAnswer,
	typeOfLyrics,
}: LyricProps) => {
	return (
		<>
			{typeOfLyrics === 'final answer' ? (
				<h2
					className={styles.currentLyrics}
					dangerouslySetInnerHTML={{ __html: currentLyrics }}
				/>
			) : (
				<>
					{isEndOfSong ? (
						<h2
							className={`${styles.currentLyrics} ${styles.clickableLyrics}`}
							onClick={revealAnswer}
						>
							{currentLyrics}
						</h2>
					) : (
						<h2 className={styles.currentLyrics}>{currentLyrics}</h2>
					)}
				</>
			)}
		</>
	);
};

export default ConfirmedLyricsBanner;
