const chooseRandomSongSection = (
	difficulty: string,
	chosenSongHasChorus: boolean,
	chosenSongVerses: number
) => {
	switch (difficulty) {
		case 'Easy':
			let selectedSection = 0;
			if (chosenSongHasChorus) {
				selectedSection = Math.floor(Math.random()) - 1;
			}
			return selectedSection;
		case 'Hard': {
			let selectedSection = Math.floor(Math.random() * chosenSongVerses);
			if (chosenSongHasChorus) {
				selectedSection -= 1;
			}
			return selectedSection;
		}
	}
};

export default chooseRandomSongSection;