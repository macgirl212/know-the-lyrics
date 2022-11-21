const adjustScore = (finalAnswerHTML: any, possibleScore: number) => {
    const wrongWords = (finalAnswerHTML.match(/color:red/g) || []).length * 100;

    const adjustedScore = possibleScore - wrongWords;

    return adjustedScore;
};

export default adjustScore;