import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema;

// Setup DB
const mongoURI = process.env.MONGODB_HOST;
const mongoDB = mongoose.connect(mongoURI).connection;
mongoDB.on('error', (err) => { console.log(err.message); });
mongoDB.once('open', () => { console.log('Mongo connection open'); });

// TODO: Finish model after implementing oauth
const userSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, index: { unique: true } },
	password: { type: String, required: true },
	is_email_on: { type: Boolean, default: true },
});

userSchema.methods.generateHash = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

const itemSchema = new Schema({
	user_id: { type: String, required: true },
	title: { type: String, required: true },
	description: { type: String, required: true },
});

const emailSchema = new Schema({
	user_id: { type: String, required: true },
	session_id: { type: String, required: true },
	opened: { type: Boolean, default: false },
});

const itemReviewSchema = new Schema({
	item_id: { type: String, required: true },
	session_id: { type: String, required: true },
	is_reviewed: { type: Boolean, default: false },
	is_skipped: { type: Boolean, default: false },
	reviewed_date: { type: Date, default: Date.now() },
});

const reviewSessionSchema = new Schema({
	type: { type: String, required: true, default: 'email' },
	user_id: { type: String, required: true },
	items: { type: Array, required: true },
});

export const UserEntity = mongoose.model('User', userSchema);
export const ItemEntity = mongoose.model('Item', itemSchema);
export const EmailEntity  = mongoose.model('Email', emailSchema);
export const ItemReviewEntity = mongoose.model('ItemReview', itemReviewSchema);
export const ReviewSessionEntity = mongoose.model('ReviewSession', reviewSessionSchema);
