import { useEffect, useState } from 'react';
import styles from '../styles/Game.module.scss';

type PrevLyricsBannerProps = {
	isEndOfSong: boolean;
	lyricIndex: number;
	lyrics: Array<string>;
	typeOfLyrics: string;
};

const PrevLyricsBanner = ({
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
			{isEndOfSong && typeOfLyrics !== 'final answer' ? (
				<p className={styles.prevLyrics}>{prevLyrics}</p>
			) : null}
		</>
	);
};

export default PrevLyricsBanner;
