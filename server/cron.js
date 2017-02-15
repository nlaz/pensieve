import { CronJob } from 'cron';
import Emailer from './emails/emailer';

export default const broadcastJob = new CronJob({
	cronTime: '00 30 8 * * *',
	onTick: () => { Emailer.broadcastEmails() },
	start: false,
	timeZone: 'America/New_York'
});
