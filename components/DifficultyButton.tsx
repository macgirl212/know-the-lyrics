import Link from 'next/link';
import chooseRandomSongSection from '../controllers/chooseRandomSongSection';

interface DifficultyButtonProps {
	difficulty: string;
	chosenSongHasChorus: boolean;
	chosenSongVerses: number;
}

const DifficultyButton = ({
	difficulty,
	chosenSongHasChorus,
	chosenSongVerses,
}: DifficultyButtonProps) => {
	const selectedSection = chooseRandomSongSection(
		difficulty,
		chosenSongHasChorus,
		chosenSongVerses
	);
	return (
		<Link href="/game">
			<a
				onClick={() => {
					sessionStorage.setItem('difficulty', difficulty.toLowerCase());
					sessionStorage.setItem(
						'selectedSection',
						selectedSection!.toString()
					);
				}}
			>
				{difficulty}
			</a>
		</Link>
	);
};

export default DifficultyButton;
