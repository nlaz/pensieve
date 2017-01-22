import express from 'express';
import mongoose from 'mongoose';
import { CronJob } from 'cron';
import Emailer from './emailer';

import {
	UserEntity,
	ItemEntity,
	EmailEntity,
	ReviewSessionEntity,
} from './db/schema';

const app = express();
const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_HOST);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection error'));

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/api/items', (req, res) => {
	console.log('Items Endpoint');
	ItemEntity.find({}, (err, items) => {
		console.log(err);
		if (err) { return console.log(err); }
		console.log('Items');
		res.send(items);
	});
});

app.get('/api/items/:itemId', (req, res) => {
	ItemEntity.findById(req.params.itemId, (err, item) => {
		if (err) { console.log(err); }
		return res.send(item);
	});
});

const broadcastEmails = () => {
	UserEntity.find({is_email_on: true}, (err, users) => {
		if (err) { return console.log(err); }

		users.forEach((user) => {
			const itemQuery = ItemEntity.find({ user_id: user.id }).limit(6);
			itemQuery.exec((err, items) => {
				if (err) { return console.log(err); }

				console.log('Items:', items);
				const itemIds = items.map(item => item.id);
				const session = new ReviewSessionEntity({
					type: 'email',
					user_id: user.id,
					items: itemIds,
				});

				Emailer.sendEmail(user, items, session)
					.then(response => {
						console.log('Success!');
						session.save();
					})
					.catch(error => {
						console.error('Uh oh!');
					});
			});
		});
	});
};

const broadcastJob = new CronJob({
	cronTime: '00 30 8 * * *',
	onTick: () => { broadcastEmails() },
	start: false,
	timeZone: 'America/New_York'
});

const logModels = () => {
	UserEntity.find({}, (err, res) => {
		if (err) { console.log(err); }
		console.log(`${res.length} Users`);
		console.log(res);
	});
};

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);

	if (process.env.NODE_ENV === 'development') {
		logModels();
		broadcastEmails();
	}

	if (process.env.NODE_ENV === 'production') {
		broadcastJob.start();
	}
});
