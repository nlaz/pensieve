import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const DeckSchema = new Schema({
	user_id: { type: String, required: true },
	title: { type: String, required: true },
	description: { type: String },
	items: {type: Array, required: true },
}, { timestamps: true });

export default mongoose.model('Deck', DeckSchema);
