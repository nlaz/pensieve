import mongoose from 'mongoose';
import {
	UserEntity,
	ItemEntity,
	EmailEntity,
	ReviewSessionEntity,
} from './db/schema';

export default function(app) {
	app.get('/', (req, res) => {
		res.send('Hello World!');
	});

	app.get('/sessions/:sessionId', (req, res) => {
		const sessionId = req.params.sessionId;
		ReviewSessionEntity.findById(sessionId, (err, session) => {
			if (err) { return console.log(err); }

			ItemEntity.find( { _id: { $in: session.items }}, (err, items) => {
				if (err) { return console.log(err); }

				console.log(items);
				res.send(items);
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
}
