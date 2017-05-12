import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, index: { unique: true }},
	password: { type: String, required: true },
	is_email_on: { type: Boolean, default: false },
});

UserSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.getCleanUser = (user) => ({
	id: user._id,
	name: user.name,
	email: user.email,
	is_email_on: user.is_email_on,
});

UserSchema.methods.generateToken = (user) => {
	const data = {
		_id: user._id.toString(),
		name: user.name,
		email: user.email,
	};
	return jwt.sign(data, process.env.JWT_SECRET, {
		expiresIn: 60 * 60 * 48 // expires in 48 hours
	});
};

export default mongoose.model('User', UserSchema);
