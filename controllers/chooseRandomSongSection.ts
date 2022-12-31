const chooseRandomSongSection = (
	difficulty: string,
	hasChorus: boolean,
	verses: number
): number => {
	// a return of 0 and above chooses verse array by index in nested array
	// a return of -1 chooses chorus
	switch (difficulty) {
		case 'Easy':
			if (hasChorus) {
				return Math.floor(Math.random() * 2) - 1;
			}
			return 0;
		case 'Medium':
		case 'Hard': {
			if (hasChorus) {
				return Math.floor(Math.random() * (verses + 1)) - 1;
			}
			return Math.floor(Math.random() * verses);
		}
	}
};

export default chooseRandomSongSection;