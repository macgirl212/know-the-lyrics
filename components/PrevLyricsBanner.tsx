import { useEffect, useState } from 'react';
import styles from '../styles/Game.module.scss';

type PrevLyricsBannerProps = {
	errorMessage: string;
	isEndOfSong: boolean;
	lyricIndex: number;
	lyrics: Array<string>;
	setErrorMessage: any;
	typeOfLyrics: string;
};

const PrevLyricsBanner = ({
	errorMessage,
	isEndOfSong,
	lyricIndex,
	lyrics,
	setErrorMessage,
	typeOfLyrics,
}: PrevLyricsBannerProps) => {
	const [prevLyrics, setPrevLyrics] = useState<string>('');

	useEffect(() => {
		// show previous line of lyrics five seconds after the song finishes
		if (isEndOfSong) {
			setTimeout(() => {
				setPrevLyrics(lyrics[lyricIndex - 2]);
			}, 5000);
		} else {
			setPrevLyrics('');
		}
	}, [isEndOfSong]);

	useEffect(() => {
		// if an error is active, show error message for five seconds
		if (errorMessage !== '') {
			setTimeout(() => {
				setErrorMessage('');
				setPrevLyrics('');
			}, 5000);

			// then show previous lyrics five seconds after the error message disappears
			setTimeout(() => {
				setPrevLyrics(lyrics[lyricIndex - 2]);
			}, 10000);
		}
	}, [errorMessage]);

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
