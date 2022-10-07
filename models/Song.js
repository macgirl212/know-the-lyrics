import mongoose from 'mongoose';

const SongSchema = new mongoose.Schema({
	title: String,
	url: String,
	lyrics: Array,
});

export default mongoose.models.Song || mongoose.model('Song', SongSchema);
