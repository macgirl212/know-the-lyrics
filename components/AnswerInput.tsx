import styles from '../styles/Game.module.scss';

type InputProps = {
	currentLyrics: string;
	splitIndex: number;
	userInput: string;
	setUserInput: any;
};

const AnswerInput = ({
	currentLyrics,
	splitIndex,
	userInput,
	setUserInput,
}: InputProps) => {
	const handleChange = (event: any) => {
		setUserInput(event.target.value);
	};
	return (
		<div className={styles.inputDiv}>
			<h2 className={styles.confirmedLyrics}>
				{currentLyrics.split(' ').slice(0, splitIndex).join(' ')}
			</h2>
			<input
				type="text"
				className={styles.missingLyrics}
				onChange={handleChange}
				value={userInput}
				placeholder={currentLyrics.split(' ').slice(splitIndex).join(' ')}
			/>
		</div>
	);
};

export default AnswerInput;
