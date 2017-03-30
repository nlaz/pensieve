import configDB from '../config/db';
import * as Emailer from '../controllers/emails';
import User from '../models/user';

configDB();

const testUserId = '589a773dc7e9d4905c32ce3c';
User.findById(testUserId)
	.then( user => {
		Emailer.broadcastEmailToUser(user);
	})
	.catch( error => {
		console.error(error);
	});
