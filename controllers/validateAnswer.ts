const validateAnswer = (answer: string, splitIndex: number, userInput: string): string => {
    // regex removes all punctuation marks
    const formattedAnswer: Array<string> = answer.replace(/[^\w +-]/g, '').split(' ');
    const userFormattedAnswer: Array<string> = formattedAnswer.slice(0, splitIndex).concat(userInput.replace(/[^\w +-]/g, '').split(' '))

    // check if user submitted the correct amount of words
    if (formattedAnswer.length > userFormattedAnswer.length) {
        return 'Error: Not enough words. Please try again.'
    }
    if (formattedAnswer.length < userFormattedAnswer.length) {
        return 'Error: Too many words. Please try again.'
    }

    // compare if user input is the correct answer
    let answerArray: Array<string> = [];
    for (let i = 0; i < formattedAnswer.length; i++) {
        if (formattedAnswer[i].toLowerCase() === userFormattedAnswer[i].toLowerCase()) {
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