import Emailer from './emailer';

if (process.env.NODE_ENV === 'development') {
	Emailer.broadcastEmails();
}
