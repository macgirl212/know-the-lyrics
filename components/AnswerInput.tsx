import styles from '../styles/Game.module.scss';

type InputProps = {
	currentLyrics: string;
	revealAnswer: any;
	splitIndex: number;
	userInput: string;
	setUserInput: any;
};

const AnswerInput = ({
	currentLyrics,
	revealAnswer,
	splitIndex,
	userInput,
	setUserInput,
}: InputProps) => {
	const handleChange = (event: any) => {
		setUserInput(event.target.value);
	};

	const handleKeyDown = (event: any) => {
		if (event.keyCode === 13) {
			revealAnswer();
		}
	};
	return (
		<div className={styles.inputDiv}>
			<h2 className={styles.confirmedLyrics}>
				{currentLyrics.split(' ').slice(0, splitIndex).join(' ')}
			</h2>
			<input
				autoFocus
				type="text"
				className={styles.missingLyrics}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				value={userInput}
				placeholder={currentLyrics.split(' ').slice(splitIndex).join(' ')}
			/>
		</div>
	);
};

export default AnswerInput;
