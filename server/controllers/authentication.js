import User from '../models/user';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;

export const signupUser = (req, res, next) => {
	const name = req.body.name.trim();
	const email = req.body.email.trim();
	const password = req.body.password.trim();

	User.findOne({ email: email }, (err, user) => {
		if (err) { return res.send(err); }

		if (user) {
			return res.status(404).json({
				error: true,
				message: 'Email is already taken',
			});
		}

		const newUser = new User();
		newUser.name = name;
		newUser.email = email;
		newUser.password = newUser.generateHash(password);

		newUser.save((err, user) => {
			if (err) { return res.send(err); }

			res.status(200).json({
				user: user.getCleanUser(user),
				token: user.generateToken(user),
			});
		});
	});
};

export const loginUser = (req, res) => {
	const email = req.body.email.trim();
	User.findOne({ email: email }, (err, user) => {
		if (err) { return res.send(err); }

		if (!user) {
			return res.status(404).json({
				error: true,
				message: 'No user found with that email and password',
			});
		}

		if (!user.validPassword(req.body.password.trim())) {
			console.log('loginUser');
			return res.status(404).json({
				error: true,
				message: 'No user found with that email and password',
			});
		}

		res.json({
			user: user.getCleanUser(user),
			token: user.generateToken(user),
		});
	});
};

export const getSelf = (req, res, next) => {
	const token = req.body.token || req.query.token;

	if (!token) {
		return res.status(401).json({
			error: true,
			message: 'Must include token',
		});
	}

	jwt.verfiy(token, jwtSecret, (err, user) => {
		if (err) { throw err; }

		res.json({
			user: user.getCleanUser(user),
			token: token // could renew token here
		});
	});
};

export default function authenticateUser(req, res, next) {
	let token = req.headers.authorization;
	if (!token) {
		return res.status(404).json({
			error: true,
			message: 'Invalid authenticaition. Please include a JWT token',
		});
	}

	token = token.replace('Bearer ', '');

	jwt.verify(token, jwtSecret, (err, user) => {
		if (err) {
			return res.status(401).json({
				error: true,
				message: 'Invalid authentication. Please log in to make requests',
			});
		}

		req.user = user;
		next();
	});
};

