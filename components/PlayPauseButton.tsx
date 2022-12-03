import Image from 'next/image';
import styles from '../styles/Game.module.scss';

type PlayPauseButtonProps = {
	audioRef: any;
	isPlaying: boolean;
	setIsPlaying: any;
};

const PlayPauseButton = ({
	audioRef,
	isPlaying,
	setIsPlaying,
}: PlayPauseButtonProps) => {
	const togglePlay = () => {
		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	const handleKeyDown = (event: any) => {
		if (event.keyCode === 80) {
			togglePlay();
		}
	};

	return (
		<a className={styles.gameButtons} onClick={togglePlay}>
			{isPlaying ? (
				<Image
					src="/pause.svg"
					height={50}
					width={50}
					className={styles.svgImage}
					onKeyDown={handleKeyDown}
					alt="Pause"
				/>
			) : (
				<Image
					src="/play.svg"
					height={50}
					width={50}
					className={styles.svgImage}
					onKeyDown={handleKeyDown}
					alt="Play"
				/>
			)}
		</a>
	);
};

export default PlayPauseButton;
