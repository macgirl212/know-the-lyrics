import Link from 'next/link';
import useGlobalStates from '../../context/AppContext';
import chooseRandomSongSection from '../../controllers/chooseRandomSongSection';
import styles from '../../styles/Home.module.scss';

interface DifficultyButtonProps {
	difficulty: string;
	hasChorus: boolean;
	verses: number;
}

const DifficultyButton = ({
	difficulty,
	hasChorus,
	verses,
}: DifficultyButtonProps) => {
	const selectedSection = chooseRandomSongSection(
		difficulty,
		hasChorus,
		verses
	);
	// @ts-ignore
	const { selectDifficulty, selectSection } = useGlobalStates();
	return (
		<Link href="/game">
			<a
				className={styles.mainButton}
				onClick={() => {
					selectDifficulty(difficulty.toLowerCase());
					selectSection(selectedSection);
				}}
			>
				{difficulty}
			</a>
		</Link>
	);
};

export default DifficultyButton;
