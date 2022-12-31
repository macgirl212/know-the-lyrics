const adjustScore = (difficulty: string, finalAnswerHTML: string, possibleScore: number): number => {
    switch (difficulty) {
        case 'easy': {
            const wrongWords = (finalAnswerHTML.match(/color:red/g) || []).length * 100;
            const adjustedScore = possibleScore - wrongWords;
            return adjustedScore;
        }
        case 'medium': {
            const wrongWords = (finalAnswerHTML.match(/color:red/g) || []).length * 200;
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