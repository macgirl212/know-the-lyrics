import dbConnect from '../../../lib/dbConnect';
import Song from '../../../models/Song';

export default async function handler(req, res) {
	const { method } = req;

	await dbConnect();

	switch (method) {
		case 'GET':
			try {
				const songs = await Song.find({});
				res.status(200).json({ success: true, data: songs });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case 'POST':
			try {
				/* this is only called to populate the database */
				const songs = await Song.create(req.body);
				res.status(201).json({ success: true, data: songs });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case 'DELETE':
			/* another call to the database is always run immediately after deleting everything, so to keep a "stream write after end" error from appearing, this will only return and not send back a res status code */
			try {
				const songs = await Song.deleteMany();
				res.status(200).json({ songs });
			} catch (error) {
				res.status(400).json({ success: false });
				break;
			}
		default:
			res.status(400).json({ success: false });
			break;
	}
}
