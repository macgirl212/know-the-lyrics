const getAllSongs = async () => {
	try {
		const res = await fetch('/api/songs', {
			method: 'GET',
		});

		const { data } = await res.json();
		console.log(data);
	} catch (error) {
		console.log(error);
	}
};

export default getAllSongs;
