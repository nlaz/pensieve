import mongoose from 'mongoose';
mongoose.connect(process.env.MONGODB_HOST);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection error'));

const Schema = mongoose.Schema;

// TODO: Finish model after implementing oauth
const userSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, index: { unique: true } },
	is_email_on: { type: Boolean, default: true },
});

const itemSchema = new Schema({
	user_id: {type: String, required: true },
	value: { type: String, required: true },
});

const reviewItemSchema = new Schema({
	email_id: { type: String, required: true },
	item_id: { type: String, required: true },
	reviewed_date: { type: Date, default: Date.now() },
	reviewed: { type: Boolean, default: false },
	skipped: { type: Boolean, default: false },
});

const emailSchema = new Schema({
	type: { type: String, required: true },
	user_id: { type: String, required: true },
	items: { type: Array, required: true },
	opened: { type: Boolean, default: false },
});

export const User = mongoose.model('User', userSchema);
export const Item = mongoose.model('Item', itemSchema);
