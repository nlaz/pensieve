import express from 'express';
import mongoose from 'mongoose';
import { CronJob } from 'cron';
import { Item, User } from './db/schema';
import { sendEmailToUser } from './emailer';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/api/items', (req, res) => {
	Item.find({}, (err, items) => {
		if (err) { console.log(err); }
		return res.send(items);
	});
});

app.get('/api/items/:itemId', (req, res) => {
	Item.findById(req.params.itemId, (err, item) => {
		if (err) { console.log(err); }
		return res.send(item);
	});
});

const broadcastEmails = () => {
	User.find({is_email_on: true}, (err, users) => {
		users.map((user) => {
			Item.find({user_id: user.id}, (err, items) => {
				items = items.map(item => item.value);
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
	User.find({}, (err, res) => {
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
