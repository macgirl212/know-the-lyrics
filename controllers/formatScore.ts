const formatScore = (score: number) => {
    let formattedScore = score.toString();
	if (formattedScore.length < 4) {
		for (let i = formattedScore.length; i < 4; i++) {
			formattedScore = `0${formattedScore}`;
		}
	}
    return formattedScore;
}

export default formatScore;