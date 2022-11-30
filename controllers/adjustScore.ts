const adjustScore = (difficulty: string, finalAnswerHTML: any, possibleScore: number) => {
    switch (difficulty) {
        case 'easy': {
            const wrongWords = (finalAnswerHTML.match(/color:red/g) || []).length * 100;
            const adjustedScore = possibleScore - wrongWords;
            return adjustedScore;
        }
        case 'hard': {
            const wrongWords = (finalAnswerHTML.match(/color:red/g) || []).length * 300;
            const adjustedScore = possibleScore - wrongWords;
            return adjustedScore;
        }
    }
};

export default adjustScore;