import Link from 'next/link';
import chooseRandomSongSection from '../controllers/chooseRandomSongSection';

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
