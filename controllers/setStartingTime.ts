interface Song {
    verseTimestamps: number[][];
    chorusTimestamps?: number[];
}

const setStartingTime = (currentSong: Song, selectedSection: number, setStartOfSection: any) => {
    switch (selectedSection) {
        // -1 selects chorus
        case -1: {
            // return five seconds before chorus starts
            const timestamp = currentSong.chorusTimestamps[0] - 5;
            setStartOfSection(timestamp);
            return timestamp;
        }
        // 0 selects first verse
        case 0: {
            const timestamp = 0;
            setStartOfSection(timestamp);
            return timestamp;
        }
        // in all other cases, start five seconds before selected section
        default: {
            const timestamp = currentSong.verseTimestamps[selectedSection][0] - 5;
            setStartOfSection(timestamp);
            return timestamp;
        }
    }
}

export default setStartingTime;