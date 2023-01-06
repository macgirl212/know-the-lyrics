import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

// controllers
import forceSelectASong from '../controllers/forceSelectASong';

// reducer
import useGlobalStates from '../context/AppContext';

// styles
import styles from '../styles/Home.module.scss';

type HiddenControlsProps = {
	allSongs: any;
};

const getSongNumbersLimit = (allSongs: any) => {
	return allSongs.length;
};

const HiddenControls = ({ allSongs }: HiddenControlsProps) => {
	const [focused, setFocused] = useState<boolean>();
	const [currentStyle, setCurrentStyle] = useState<string>(
		styles.hiddenControls
	);
	const [numberList, setNumberList] = useState<number>();

	// @ts-ignore
	const { difficulty, selectDifficulty, selectASong } = useGlobalStates();
	const controllerRef = useRef();
	const inputRef = useRef();

	useEffect(() => {
		if (allSongs) {
			setNumberList(getSongNumbersLimit(allSongs));
		}
	}, [allSongs]);

	useEffect(() => {
		// listens for esc key
		const handleKeyDown = (event: any) => {
			// "esc" reveals hidden controls
			if (event.keyCode === 27) {
				toggleFocused();
				setFocused(!focused);
			}
		};
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [focused]);

	useEffect(() => {
		toggleFocused();
	}, [focused]);

	const handleFocus = () => {
		setFocused(true);
	};

	const handleBlur = () => {
		setFocused(false);
	};

	// these special controls appear from bottom left of screen
	const toggleFocused = () => {
		if (focused) {
			setCurrentStyle(`${styles.hiddenControls} ${styles.focused}`);
		} else {
			setCurrentStyle(styles.hiddenControls);
		}
	};

	return (
		<div className={currentStyle} ref={controllerRef}>
			<h3>Controller</h3>
			{difficulty !== '' ? (
				<Link href="/select">
					<button
						onClick={() => {
							selectDifficulty('');
						}}
						onFocus={handleFocus}
						onBlur={handleBlur}
					>
						Next Song
					</button>
				</Link>
			) : (
				<div className={styles.songSelector}>
					<input type="number" min="1" max={numberList} ref={inputRef} />
					<button
						onClick={() => {
							selectASong(forceSelectASong(allSongs, inputRef, numberList));
						}}
					>
						Enter
					</button>
				</div>
			)}
			<Link href="/scores">
				<button onFocus={handleFocus} onBlur={handleBlur}>
					Abandon Game
				</button>
			</Link>
		</div>
	);
};

export default HiddenControls;
