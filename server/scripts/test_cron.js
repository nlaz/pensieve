import configureDB from '../config/db';
import { CronJob } from 'cron';
import * as Emailer from '../controllers/emails';

configureDB();

const broadcastJob = new CronJob({
	cronTime: '00 * 23 * * *',
	onTick: () => Emailer.broadcastEmailsToAll(),
	start: false,
	timeZone: 'America/New_York',
});

broadcastJob.start();

