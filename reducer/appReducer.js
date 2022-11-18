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
	prevPlayedSongs: [],
	score: 0,
};

const appReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'SELECTED_A_SONG': {
			return {
				...state,
				currentSong: payload.currentSong,
			};
		}
		case 'COMPLETED_A_SONG': {
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
		default:
			throw new Error(`No case for type ${type} found in appReducer.`);
	}
};

export default appReducer;
