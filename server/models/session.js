import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SessionSchema = new Schema({
	user_id: { type: String, required: true },
	items: { type: Array, required: true },
}, { timestamps: true });

export default mongoose.model('ReviewSession', SessionSchema);
