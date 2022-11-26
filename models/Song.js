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
	bridge: {
		type: [String],
		required: false,
	},
	ending: {
		type: [String],
		required: false,
	},
	verseTimestamps: {
		type: [Array],
		required: true,
	},
	chorusTimestamps: {
		type: [Number],
		required: false,
	},
	bridgeTimestamps: {
		type: [Number],
		required: false,
	},
	endingTimestamps: {
		type: [Number],
		required: false,
	},
	hasChorus: {
		type: Boolean,
		required: true,
	},
	hasBridge: {
		type: Boolean,
		required: true,
	},
	hasEnding: {
		type: Boolean,
		required: true,
	},
});

export default mongoose.models.Song || mongoose.model('Song', SongSchema);
