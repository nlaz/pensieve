import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/boreas');

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
	value: { type: String, required: true },
});

export const User = mongoose.model('User', userSchema);
export const Item = mongoose.model('Item', itemSchema);
