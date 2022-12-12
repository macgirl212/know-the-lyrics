import { useEffect, useState } from 'react';
import styles from '../styles/Game.module.scss';

type PrevLyricsBannerProps = {
	errorMessage: string;
	isEndOfSong: boolean;
	lyricIndex: number;
	lyrics: Array<string>;
	typeOfLyrics: string;
};

const PrevLyricsBanner = ({
	errorMessage,
	isEndOfSong,
	lyricIndex,
	lyrics,
	typeOfLyrics,
}: PrevLyricsBannerProps) => {
	const [prevLyrics, setPrevLyrics] = useState<string>('');

	useEffect(() => {
		if (isEndOfSong) {
			setTimeout(() => {
				setPrevLyrics(lyrics[lyricIndex - 2]);
			}, 5000);
		} else {
			setPrevLyrics('');
		}
	}, [isEndOfSong]);

	return (
		<>
			{errorMessage === '' ? (
				<>
					{isEndOfSong && typeOfLyrics !== 'final answer' ? (
						<p className={styles.prevLyrics}>{prevLyrics}</p>
					) : null}
				</>
			) : (
				<p className={styles.errorMessage}>{errorMessage}</p>
			)}
		</>
	);
};

export default PrevLyricsBanner;
