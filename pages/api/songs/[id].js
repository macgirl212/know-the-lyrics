import dbConnect from '../../../lib/dbConnect';
import Song from '../../../models/Song';

export default async function handler(req, res) {
	const {
		query: { id },
		method,
	} = req;

	await dbConnect();

	switch (method) {
		case 'GET' /* Get a model by its ID */:
			try {
				const song = await Song.findById(id);
				if (!song) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, data: song });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
	}
}
