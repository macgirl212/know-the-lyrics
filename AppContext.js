import React from 'react';
import appReducer, { initialState } from './reducer/appReducer';
import { createContext, useReducer, useContext } from 'react';

const AppContext = React.createContext(initialState);

export const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(appReducer, initialState);

	const selectedASong = (song) => {
		dispatch({
			type: 'SELECTED_A_SONG',
			payload: {
				currentSong: song,
			},
		});
	};

	const completedASong = (song) => {
		const updatedPlayedSongs = state.prevPlayedSongs.concat(song);

		dispatch({
			type: 'COMPLETED_A_SONG',
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

	const value = {
		currentSong: state.currentSong,
		prevPlayedSongs: state.prevPlayedSongs,
		score: state.score,
		selectedASong,
		completedASong,
		addToScore,
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
