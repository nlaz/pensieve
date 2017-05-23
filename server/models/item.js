import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
	user_id: { type: String, required: true },
	title: { type: String, required: true },
	description: { type: String },
	reviewCount: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Item', ItemSchema);
