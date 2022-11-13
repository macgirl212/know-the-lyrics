import mongoose from 'mongoose';

const SongSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	link: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
	verses: {
		type: [Array],
		required: true,
	},
	chorus: {
		type: [String],
		required: false,
	},
	verseTimestamps: {
		type: [Array],
		required: true,
	},
	chorusTimestamps: {
		type: [Array],
		required: false,
	},
	hasChorus: {
		type: Boolean,
		required: true,
	},
});

export default mongoose.models.Song || mongoose.model('Song', SongSchema);
