const chooseLastLineIndex = (lyrics: Array<string>, difficulty: string) => {
    switch (difficulty) {
        case 'easy':
            // always return at most index 7
            if (lyrics.length <= 8) {
                return lyrics.length - 1;
            }
            return Math.floor(Math.random() * (7 - 3) + 3);
        case 'hard':
            // randomize and return at most index 11
            if (lyrics.length < 4) {
                return lyrics.length - 1;
            }
            if (lyrics.length <= 8) {
                return Math.floor(Math.random() * (lyrics.length - 3) + 3)
            } else if (lyrics.length >= 12) {
                return Math.floor(Math.random() * (11 - 3) + 3)
            }
            return Math.floor(Math.random() * (lyrics.length - 3) + 3)
        default:
            // if this was called, something went very wrong
            console.log("well... idk");
            return lyrics.length - 3;
    };
};

export default chooseLastLineIndex;