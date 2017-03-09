import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;

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

userSchema.methods.getCleanUser = (user) => ({
	id: user._id,
	name: user.name,
	email: user.email,
	is_email_on: user.is_email_on,
});

userSchema.methods.generateToken = (user) => {
	const data = {
		_id: user._id.toString(),
		name: user.name,
		email: user.email
	};
	return jwt.sign(data, process.env.JWT_SECRET, {
		expiresIn: 60 * 60 * 24 // expires in 24 hours
	});
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
	user_id: { type: String, required: true },
	items: { type: Array, required: true },
}, { timestamps: true });

export const UserEntity = mongoose.model('User', userSchema);
export const ItemEntity = mongoose.model('Item', itemSchema);
export const EmailEntity  = mongoose.model('Email', emailSchema);
export const ItemReviewEntity = mongoose.model('ItemReview', itemReviewSchema);
export const ReviewSessionEntity = mongoose.model('ReviewSession', reviewSessionSchema);
