import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { UserEntity, ItemEntity } from './models/schema';

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

function authenticateUser(req, res, next) {
	let token = req.headers.authorization;
	if (!token) {
		return res.status(404).json({
			error: true,
			message: 'Invalid authentication. Please include a JWT token',
		});
	}

	token = token.replace('Bearer ', '');

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			return res.status(401).json({
				error: true,
				message: 'Invalid authentication. Please log in to make requests'
			});
		}
		req.user = user;
		next();
	});
}

export default function(app) {
	app.post('/users/signup', function (req, res, next) {
		const body = req.body;
		const newUser = new UserEntity();
		const name = req.body.name.trim(),
			email = req.body.email.trim();
			
		UserEntity.findOne({ email: email }, (err, user) => {
			if (err) { return res.send(err); }

			if (user) {
				return res.status(404).json({
					error: true,
					message: 'That email is already taken'
				});
			}

			const newUser = new UserEntity();
			newUser.name = name;
			newUser.email = email;
			newUser.password = newUser.generateHash(req.body.password.trim());

			newUser.save((err, user) => {
				if (err) { return res.send(err); }

				res.json({
					user: user.getCleanUser(user),
					token: user.generateToken(user),
				});
			});
		});
	});

	app.post('/users/login', function(req, res) {
		const email = req.body.email.trim();
		UserEntity.findOne({ email: email }, (err, user) => {
			if (err) { return res.send(err); }

			if (!user) {
				return res.status(404).json({
					error: true,
					message: 'No user found with that email and password'
				});
			}

			if (!user.validPassword(req.body.password.trim())) {
				return res.status(404).json({
					error: true,
					message: 'No user found with that email and password'
				});
			}

			res.json({
				user: user.getCleanUser(user),
				token: user.generateToken(user),
			});
		});
	});

	app.get('/self', function(req, res, next) {
		const token = req.body.token || req.query.token;

		if (!token) {
			return res.status(401).json({
				error: true,
				message: 'Must include token',
			});
		}

		jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
			if (err) { throw err; }

			UserEntity.findById(user._id, (err, user) => {
				if (err) throw err;

				res.json({
					user: user.getCleanUser(user),
					token: token // could renew token here
				});
			});
		});
	});

	app.get('/api/items', authenticateUser, (req, res) => {
		const user = req.user;
		ItemEntity.find({ user_id: user._id }, (err, items) => {
			if (err) { return console.log(err); }
			res.send(items);
		});
	});

	app.get('/api/items/:item_id', authenticateUser, (req, res) => {
		const itemId = req.params.item_id;
		const user = req.user;
		ItemEntity.findOne({ user_id: user._id, _id: itemId }, (err, item) => {
			if (err) { return console.log(err); }
			res.send(item);
		});
	});

	app.post('/items', isLoggedIn, (req, res) => {
		const item = new ItemEntity({
			user_id: req.user.id,
			title: req.body.title,
			description: req.body.description,
		});

		item.save((err) => {
			if (err) { res.send(err); }

			res.redirect('/');
		});
	});

	/*
	app.get('/profile', isLoggedIn, (req, res) => {
		res.render('profile.ejs', {
			user: req.user,
		});
	});

	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	app.get('/sessions/:sessionId', isLoggedIn, (req, res) => {
		const sessionId = req.params.sessionId;
		ReviewSessionEntity.findById(sessionId, (err, session) => {
			if (err) { return console.log(err); }

			ItemEntity.find( { _id: { $in: session.items }, user_id: req.user.id }, (err, items) => {
				if (err) { return console.log(err); }

				res.render('sessions.ejs', {
					items: items,
				});
			});
		});
	});
	*/
}
