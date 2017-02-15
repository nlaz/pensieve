import mongoose from 'mongoose';
import passport from 'passport';
import {
	UserEntity,
	ItemEntity,
	EmailEntity,
	ReviewSessionEntity,
} from './db/schema';

export default function(app, passport) {
	app.get('/*', (req, res) => {
		res.sendFile(__dirname + '/../public/index.html');
	});

	app.use(cookieParser());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

	//	app.get('/login', (req, res) => {
	//	res.render('login.ejs', {
	//		message: req.flash('loginMessage'),
	//	});
	//	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true,
	}));

	app.get('/signup', (req, res) => {
		res.render('signup.ejs', {
			message: req.flash('signupMessage'),
		});
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true,
	}));

	app.get('/items/new', isLoggedIn, (req, res) => {
		res.render('new_item.ejs', {
			user: req.user
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

	app.get('/api/items', (req, res) => {
		ItemEntity.find({}, (err, items) => {
			if (err) { return console.log(err); }
			res.send(items);
		});
	});

	app.get('/api/items/:itemId', (req, res) => {
		ItemEntity.findById(req.params.itemId, (err, item) => {
			if (err) { console.log(err); }
			return res.send(item);
		});
	});

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}

		res.redirect('/');
	}
}