export const initialState = {
	currentSong: {
		title: '',
		url: '',
		verses: [],
		chorus: [],
		verseTimestamps: [],
		chorusTimestamps: [],
		hasChorus: false,
	},
	difficulty: '',
	selectedSection: 0,
	prevPlayedSongs: [],
	score: 0,
};

const appReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'SELECT_A_SONG': {
			return {
				...state,
				currentSong: payload.currentSong,
			};
		}
		case 'SELECT_DIFFICULTY': {
			return {
				...state,
				difficulty: payload.difficulty,
			};
		}
		case 'SELECT_SECTION': {
			return {
				...state,
				selectSection: payload.selectedSection,
			};
		}
		case 'COMPLETE_A_SONG': {
			return {
				...state,
				prevPlayedSongs: payload.prevPlayedSongs,
			};
		}
		case 'ADD_TO_SCORE': {
			return {
				...state,
				score: payload.score,
			};
		}

		case 'RESET_GAME': {
			return {
				...state,
				currentSong: payload.currentSong,
				prevPlayedSongs: payload.prevPlayedSongs,
				score: payload.score,
			};
		}

		default:
			throw new Error(`No case for type ${type} found in appReducer.`);
	}
};

export default appReducer;
