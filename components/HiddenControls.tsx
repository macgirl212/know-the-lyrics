import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

import styles from '../styles/Home.module.scss';

const HiddenControls = () => {
	const [focused, setFocused] = useState<boolean>();
	const [currentStyle, setCurrentStyle] = useState<string>(
		styles.hiddenControls
	);
	const controllerRef = useRef();

	// on focus and/or hover, these special controls appear from bottom left of screen
	useEffect(() => {
		if (focused) {
			setCurrentStyle(`${styles.hiddenControls} ${styles.focused}`);
			console.log(controllerRef.current);
		} else {
			setCurrentStyle(styles.hiddenControls);
			console.log(controllerRef.current);
		}
	}, [focused]);

	const handleFocus = () => {
		setFocused(true);
	};

	const handleBlur = () => {
		setFocused(false);
	};

	return (
		<div className={currentStyle} ref={controllerRef}>
			<h3>Controller</h3>
			<Link href="/scores">
				<button onFocus={handleFocus} onBlur={handleBlur}>
					Abandon Game
				</button>
			</Link>
		</div>
	);
};

export default HiddenControls;
