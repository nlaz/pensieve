import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
	item_id: { type: String, required: true },
	user_id: { type: String, required: true },
	value: { type: String },
}, { timestamps: true });

export default mongoose.model('Review', ReviewSchema);
