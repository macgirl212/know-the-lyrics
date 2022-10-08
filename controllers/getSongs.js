export const getAllSongs = async () => {
	try {
		const res = await fetch('/api/songs', {
			method: 'GET',
		});

		const { data } = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const getOneSong = async (id) => {
	try {
		console.log(id);
		const res = await fetch(`/api/songs/${id}`, {
			method: 'GET',
		});

		const { data } = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};
