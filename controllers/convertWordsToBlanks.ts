const convertWordsToBlanks = (correctAnswer: string, splitIndex: number): string => {
    // split correct answer into two arrays
    const answerWordsArray = correctAnswer.split(' ');
    const originalWords = answerWordsArray.slice(0, splitIndex);
    const wordsToRemove = answerWordsArray.slice(splitIndex);

    // replace second array with blanks and join with first array into one string
    const blanks = wordsToRemove.join(' ').replace(/\S/g, '_');
    const blankLyrics = `${originalWords.join(' ')} ${blanks}`;
    return blankLyrics
}

export default convertWordsToBlanks