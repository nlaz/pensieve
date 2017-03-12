import Item from '../models/item';
import Session from '../models/session';

export const getSessions = (req, res) => {
	const userId = req.user._id;
	Session.find({ user_id: userId }, (err, sessions) => {
		if (err) { return console.log(err); }
		res.send(sessions);
	});
};

export const getSession = (req, res) => {
	const sessionId = req.params.session_id;
	const userId = req.user._id;
	Session.findOne({ _id: sessionId, user_id: userId }, (err, session) => {
		if (err) { return console.log(err); }

		Item.find().where('_id').in(session.items).exec((err, items) => {
			if (err) { return console.log(err); }
			session.items = items;
			res.send(session);
		});
	});
};

export const createSession = (req, res, next) => {
	const userId = req.user._id;
	Item.find({ user_id: userId}).limit(6).exec((err, items) => {
		if (err) { return console.log(err); }
		if (!items.length) {
			return res.status(404).json({
				error: true,
				message: 'No available items to create session.'
			});
		}

		const itemIds = items.map(item => item.id);
		const session = new Session({
			user_id: userId,
			items: itemIds,
		});

		session.save((err) => {
			if (err) {
				res.send({ error: err });
				return next(err);
			}

			return res.status(200).json({
				message: 'Session successfully created!',
				session: session,
			});
		});
	});
};
