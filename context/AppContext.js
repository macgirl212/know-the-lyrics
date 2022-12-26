import React from 'react';
import { appReducer, initialState } from './appReducer';
import { createContext, useReducer, useContext } from 'react';

const AppContext = createContext(initialState);

export const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(appReducer, initialState);

	const selectASong = (song) => {
		dispatch({
			type: 'SELECT_A_SONG',
			payload: {
				currentSong: song,
			},
		});
	};

	const selectDifficulty = (difficulty) => {
		dispatch({
			type: 'SELECT_DIFFICULTY',
			payload: {
				difficulty: difficulty,
			},
		});
	};

	const selectSection = (section) => {
		dispatch({
			type: 'SELECT_SECTION',
			payload: {
				selectedSection: section,
			},
		});
	};

	const completeASong = (song) => {
		const updatedPlayedSongs = state.prevPlayedSongs.concat(song);

		dispatch({
			type: 'COMPLETE_A_SONG',
			payload: {
				prevPlayedSongs: updatedPlayedSongs,
			},
		});
	};

	const addToScore = (score) => {
		const updatedScore = state.score + score;

		dispatch({
			type: 'ADD_TO_SCORE',
			payload: {
				score: updatedScore,
			},
		});
	};

	const resetGame = () => {
		dispatch({
			type: 'RESET_GAME',
			payload: {
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
			},
		});
	};

	const value = {
		currentSong: state.currentSong,
		difficulty: state.difficulty,
		selectedSection: state.selectedSection,
		prevPlayedSongs: state.prevPlayedSongs,
		score: state.score,
		selectASong,
		selectDifficulty,
		selectSection,
		completeASong,
		addToScore,
		resetGame,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useGlobalStates = () => {
	const context = useContext(AppContext);

	if (context === undefined) {
		throw new Error('useGlobalStates must be used within AppContext');
	}

	return context;
};

export default useGlobalStates;
