import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { CronJob } from 'cron';
import Emailer from './emails/emailer';
import setupRoutes from './routes';

import {
	UserEntity,
	ItemEntity,
	EmailEntity,
	ReviewSessionEntity,
} from './db/schema';

const app = express();
const port = process.env.PORT || 3000;

// Config express parsing capabilties
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Pulling routes for ./routes.js
setupRoutes(app);

// Cron job that sends out early morning emails
const broadcastJob = new CronJob({
	cronTime: '00 30 8 * * *',
	onTick: () => { Emailer.broadcastEmails() },
	start: false,
	timeZone: 'America/New_York'
});

// App load function
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);

	if (process.env.NODE_ENV === 'production') {
		broadcastJob.start();
	}
});
