import { CronJob } from 'cron';
import * as Emailer from './controllers/emails';

export const broadcastEmailsCronJob = new CronJob({
	cronTime: '00 30 8 * * *',
	onTick: () => Emailer.broadcastEmailsToAll(),
	start: false,
	timeZone: 'America/New_York'
});
