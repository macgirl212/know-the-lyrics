import styles from '../styles/Game.module.scss';

type LyricProps = {
	currentLyrics: string;
	typeOfLyrics: string;
};

const ConfirmedLyricsBanner = ({ currentLyrics, typeOfLyrics }: LyricProps) => {
	return (
		<>
			{typeOfLyrics === 'final answer' ? (
				<h2
					className={styles.currentLyrics}
					dangerouslySetInnerHTML={{ __html: currentLyrics }}
				/>
			) : (
				<h2 className={`${styles.currentLyrics} ${styles.neutralLyrics}`}>
					{currentLyrics}
				</h2>
			)}
		</>
	);
};

export default ConfirmedLyricsBanner;
