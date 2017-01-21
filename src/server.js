import express from 'express';
import mongoose from 'mongoose';
import { CronJob } from 'cron';
import { sendEmailToUser } from './emailer';

import {
	UserEntity,
	ItemEntity
} from './db/schema';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/api/items', (req, res) => {
	ItemEntity.find({}, (err, items) => {
		if (err) { console.log(err); }
		return res.send(items);
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
		users.map((user) => {
			ItemEntity.find({user_id: user.id}, (err, items) => {
				items = items.map(item => item.title);
				sendEmailToUser(user.name, user.email, items);
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
