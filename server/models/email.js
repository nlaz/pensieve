import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const EmailSchema = new Schema({
	user_id: { type: String, required: true },
	session_id: { type: String, required: true },
	opened: { type: Boolean, default: false },
});

export default mongoose.model('Email', EmailSchema);
