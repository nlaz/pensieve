import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { CronJob } from 'cron';
import Emailer from './emailer';
import setupRoutes from './routes';

import {
	UserEntity,
	ItemEntity,
	EmailEntity,
	ReviewSessionEntity,
} from './db/schema';

const app = express();
const port = process.env.PORT || 3000;

// Setup DB
const mongoURI = process.env.MONGODB_HOST;
const mongoDB = mongoose.connect(mongoURI).connection;
mongoDB.on('error', (err) => { console.log(err.message); });
mongoDB.once('open', () => { console.log('Mongo connection open'); });

// Config express parsing capabilties
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

setupRoutes(app);

const broadcastJob = new CronJob({
	cronTime: '00 30 8 * * *',
	onTick: () => { Emailer.broadcastEmails() },
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
		Emailer.broadcastEmails();
	}

	if (process.env.NODE_ENV === 'production') {
		broadcastJob.start();
	}
});
