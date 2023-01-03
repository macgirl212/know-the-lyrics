import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

// reducer
import useGlobalStates from '../context/AppContext';

// styles
import styles from '../styles/Home.module.scss';

const HiddenControls = () => {
	const [focused, setFocused] = useState<boolean>();
	const [currentStyle, setCurrentStyle] = useState<string>(
		styles.hiddenControls
	);
	// @ts-ignore
	const { difficulty, selectDifficulty } = useGlobalStates();
	const controllerRef = useRef();

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
			) : null}
			<Link href="/scores">
				<button onFocus={handleFocus} onBlur={handleBlur}>
					Abandon Game
				</button>
			</Link>
		</div>
	);
};

export default HiddenControls;
