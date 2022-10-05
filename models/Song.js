import mongoose from 'mongoose';

const SongSchema = new mongoose.Schema({
	title: String,
	url: String,
	lyrics: Array,
});

const Song = mongoose.models.Song || mongoose.model('Song', SongSchema);

export default Song;
