import mongoose from 'mongoose';

const SongSchema = new mongoose.Schema({
	title: String,
	url: String,
	lyrics: Array,
	timestamps: Array,
	hasChorus: Boolean,
});

export default mongoose.models.Song || mongoose.model('Song', SongSchema);
