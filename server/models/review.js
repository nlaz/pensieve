import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
	item_id: { type: String, required: true },
	session_id: { type: String, required: true },
	is_reviewed: { type: Boolean, default: false },
	is_skipped: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Review', ReviewSchema);
