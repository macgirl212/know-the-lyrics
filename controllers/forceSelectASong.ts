const forceSelectASong = (allSongs: any, inputRef: any, numberList: number) => {
	const selectedNumber = inputRef.current.value;

	// if the selected number falls outside of possible songs, return immediately
	if (selectedNumber > numberList || selectedNumber < 1) {
		return;
	}

	let urlSuffix = `${selectedNumber}.mp3`;
    // reformat the url so it always results as ###.mp3
	if (selectedNumber.length < 3) {
		for (let i = selectedNumber.length; i < 3; i++) {
			urlSuffix = `0${urlSuffix}`;
		}
	}

    // @ts-ignore
    const selectedSong = allSongs.find(song => song.url.endsWith(urlSuffix))
    return selectedSong
    
};

export default forceSelectASong;