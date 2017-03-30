import Item from '../models/item';
import Session from '../models/session';

export const getSessions = (req, res) => {
	Session.find({ user_id: req.user._id })
		.then((sessions) => res.status(200).json({ sessions }))
		.catch(error => res.status(404).json({ error }));
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
		.catch(error => res.status(404).json({ error }));
};

export const generateReviewSession = userId => {
	let session, items, itemIds;
	const MIN = 8, MAX = 14;
	const queryLimit = Math.floor(Math.random() * (MAX - MIN)) + MIN;

	return Item.find({ user_id: userId}).limit(queryLimit)
		.then(_items => {
			items = _items;
			if (!items.length) {
				throw new Error('No available items to create session.');
			}

			itemIds = items.map(item => item.id);
			session = new Session({ user_id: userId, items: itemIds });
			return session.save();
		})
		.then(session => {
			session.items = items;
			return session;
		})
		.catch( error => {
			throw(error);
		});
};

export const createSession = (req, res, next) => {
	generateReviewSession(req.user._id)
		.then( session => res.status(200).json({ session }))
		.catch( error => {
			res.status(404).json({ error });
		});
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
		.catch(error => res.status(404).json({ error }));
};
