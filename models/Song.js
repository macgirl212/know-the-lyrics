import mongoose from 'mongoose';

const SongSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
	firstVerse: {
		type: [String],
		required: true,
	},
	secondVerse: {
		type: [String],
		required: false,
	},
	thirdVerse: {
		type: [String],
		required: false,
	},
	chorus: {
		type: [String],
		required: false,
	},
	bridge: {
		type: [String],
		required: false,
	},
	timestamps: {
		type: [Number],
		required: true,
	},
	hasChorus: {
		type: Boolean,
		required: true,
	},
});

export default mongoose.models.Song || mongoose.model('Song', SongSchema);
