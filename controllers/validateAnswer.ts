const validateAnswer = (answer: string, currentLyrics: string, splitIndex: number, userInput: string) => {
    // compare if user input is the correct answer
    const formattedAnswer = answer.replace(/[^\w +-]/g, '').split(' ');
    const userFormattedAnswer = `${currentLyrics
        .replace(/[^\w +-]/g, '')
        .split(' ')
        .slice(0, splitIndex)
        .join(' ')} ${userInput}`;

    let answerArray = [];
    for (let i = 0; i < formattedAnswer.length; i++) {
        if (formattedAnswer[i].toLowerCase() === userFormattedAnswer.split(' ')[i].toLowerCase()) {
            answerArray.push(
                `<span style="color:green;">${answer.split(' ')[i]} </span>`
            );
        } else {
            answerArray.push(
                `<span style="color:red;">${answer.split(' ')[i]} </span>`
            );
        }
    }

    const finalAnswer = answerArray.join('');
    return finalAnswer;
}

export default validateAnswer;