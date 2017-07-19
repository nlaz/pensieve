import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
	user_id: { type: String, required: true },
	deck_id: { type: String },
	title: { type: String, required: true },
	description: { type: String },
	reviewCount: { type: Number, default: 0 },
	counter: { type: Number, default: 0 },
	nextReviewDate: { type: Date, default: new Date() },
	hidden: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Item', ItemSchema);
