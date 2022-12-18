const adjustSplitIndex = (correctAnswer: string, difficulty: string) => {
    const wordsAmount = correctAnswer.split(' ').length

    // easy difficulty removes last three words
    const easySplitIndex = -3
    // hard difficulty removes all but first word
    const hardSplitIndex = 1

    switch (difficulty) {
        case 'easy':
            // if words amount is less than three but more than one, adjust to make sure at least one word is visible
            if (wordsAmount > Math.abs(easySplitIndex) && wordsAmount !== 1) {
                return easySplitIndex;
            }
            return easySplitIndex + 1
        case 'medium':
            // always make at least three words invisible
            return easySplitIndex;
        case 'hard':
            // if words amount is less than three, adjust to make sure all words are invisible
            if (wordsAmount > Math.abs(easySplitIndex)) {
                return hardSplitIndex;
            }
            return easySplitIndex
    }
};

export default adjustSplitIndex;