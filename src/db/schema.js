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

export const User = mongoose.model('User', userSchema);
export const Item = mongoose.model('Item', itemSchema);
