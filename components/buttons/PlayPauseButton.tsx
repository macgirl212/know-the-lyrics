import Image from 'next/image';
import styles from '../../styles/Game.module.scss';

type PlayPauseButtonProps = {
	isPlaying: boolean;
	togglePlay: any;
};

const PlayPauseButton = ({ isPlaying, togglePlay }: PlayPauseButtonProps) => {
	return (
		<a className={styles.gameButtons} onClick={togglePlay}>
			{isPlaying ? (
				<Image
					src="/pause.svg"
					height={50}
					width={50}
					className={styles.svgImage}
					alt="Pause"
				/>
			) : (
				<Image
					src="/play.svg"
					height={50}
					width={50}
					className={styles.svgImage}
					alt="Play"
				/>
			)}
		</a>
	);
};

export default PlayPauseButton;
