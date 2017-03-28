import Item from '../models/item';
import Session from '../models/session';

export const getSessions = (req, res) => {
	const userId = req.user._id;

	Session.find({ user_id: userId })
		.then((sessions) => res.status(200).json({ sessions }))
		.catch(err => res.status(404).json({ err }));
};

export const getSession = (req, res) => {
	let session;
	const userId = req.user._id;
	const sessionId = req.params.session_id;

	Session.findOne({ _id: sessionId, user_id: userId })
		.then(_session => {
			session = _session;
			return Item.find().where('_id').in(session.items);
		})
		.then((items) => {
			session.items = items;
			res.status(200).json({ session });
		})
		.catch(err => res.status(404).json({ err }));
};

export const createSession = (req, res, next) => {
	let session, items, itemIds;
	const MIN = 8, MAX = 14;
	const userId = req.user._id;
	const queryLimit = Math.floor(Math.random() * (MAX - MIN)) + MIN;

	Item.find({ user_id: userId}).limit(queryLimit)
		.then(_items => {
			items = _items;
			if (!items.length) {
				res.status(404).json({
					error: true,
					message: 'No available items to create session.',
				});
			}

			itemIds = items.map(item => item.id);
			session = new Session({ user_id: userId, items: itemIds });
			return session.save();
		})
		.then(session => {
			session.items = items;
			res.status(200).json({ session });
		})
		.catch(err => res.status(404).json({ err }));
};

export const finishSession = (req, res) => {
	let session;
	const sessionId = req.params.session_id;
	const userId = req.user._id;

	Session.findOne({ _id: sessionId, user_id: userId })
		.then(_session => {
			session = _session;
			session.finishedAt = new Date();
			return session.save();
		})
		.then(_session => {
			session = _session;
			return Item.find().where('_id').in(session.items);
		})
		.then(items => {
			session.items = items;
			res.status(200).json({ session });
		})
		.catch(err => res.status(404).json({ err }));
};
