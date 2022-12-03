import Image from 'next/image';
import styles from '../styles/Game.module.scss';

type RestartButtonProps = {
	restartSong: any;
	typeOfLyrics: string;
};

const RestartButton = ({ restartSong, typeOfLyrics }: RestartButtonProps) => {
	const handleKeyDown = (event: any) => {
		if (event.keyCode === 82) {
			restartSong();
		}
	};
	return (
		<>
			{typeOfLyrics === 'final answer' ? null : (
				<div className={styles.restartButton}>
					<a onClick={restartSong}>
						<Image
							src="/refresh.svg"
							height={50}
							width={50}
							className={styles.svgImage}
							onKeyDown={handleKeyDown}
							alt="Restart"
						/>
					</a>
				</div>
			)}
		</>
	);
};

export default RestartButton;
