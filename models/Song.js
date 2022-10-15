import mongoose from 'mongoose';

const LyricSchema = new mongoose.Schema({
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
});

const SongSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
	lyrics: {
		type: [LyricSchema],
		required: true,
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
