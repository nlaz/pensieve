import Emailer from './emailer';
import configDB from '../../config/db';

if (process.env.NODE_ENV === 'development') {
	configDB();
	Emailer.broadcastEmails();
}
