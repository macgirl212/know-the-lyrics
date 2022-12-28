const selectScoreMultiplier = (correctAnswer: string, adjustedSplitIndex: number, difficulty: string) => {
    let baseScore = correctAnswer.split(' ').slice(adjustedSplitIndex).length * 100;
    console.log(baseScore)
    switch (difficulty) {
        case "easy": 
            return baseScore;

        case "medium": 
            return baseScore * 2;

        case "hard": 
            return baseScore * 3;

    }
};

export default selectScoreMultiplier;