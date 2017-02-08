import { Strategy as LocalStrategy } from 'passport-local';
import { UserEntity } from '../src/db/schema';

export default function(passport) {

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		UserEntity.findById(id, (err, user) => {
			done(err, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true,
	}, (req, email, password, done) => {
		process.nextTick(() => {
			UserEntity.findOne({ email: email }, (err, user) => {
				if (err) { return done(err); }

				if (user) {
					return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
				} else {
					const newUser = new UserEntity();

					newUser.name = req.body.name;
					newUser.email = email;
					newUser.password = newUser.generateHash(password);

					newUser.save((err) => {
						if (err) { throw err; }

						return done(null, newUser);
					});
				}
			});
		});
	}));

	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true,
	}, (req, email, password, done) => {
		process.nextTick(() => {
			UserEntity.findOne({ email: email }, (err, user) => {
				if (err) { return done(err); }

				if (!user) {
					return done(null, false, req.flash('localMessage', 'No user found.'));
				}

				if (!user.validPassword(password)) {
					return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
				}

				return done(null, user);
			});
		});
	}));
}
