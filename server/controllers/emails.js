import sg, { mail as helper } from 'sendgrid';
import Email from '../models/email';
import Item from '../models/item';
import Session from '../models/session';
import User from '../models/user';

import * as SessionController from './sessions';

const sendgrid = sg(process.env.SENDGRID_API_KEY);

const domain = process.env.HOST_URL;
const sourceEmail = new helper.Email('boreas@test.com');
const subject = 'Your Daily Review - Boreas';

const template = (name, items, sessionId) => {
	const url = `${domain}/sessions/${sessionId}`;
	return (
	`<div>
		<p>Hi ${name},</p>

		<p>These are the items for you to review today:</p>
		<ul>${items}</ul>

		<a href='${url}' >Review Now</a>

		<p>Cheers!,</p>
		<p>Boreas</p>
	</div>`
	);
};

const constructEmailRequest = (targetName, targetEmail, items, sessionId) => {
	const titles = items.map(item => `<li>${item.title}</li>`).join('');
	const content = new helper.Content('text/html', template(targetName, titles, sessionId));
	const mail = new helper.Mail(sourceEmail, subject, new helper.Email(targetEmail), content);
	return sendgrid.emptyRequest({
		method: 'POST',
		path: '/v3/mail/send',
		body: mail.toJSON(),
	});
};

export const broadcastEmailToUser = user => {
	SessionController.generateReviewSession(user.id)
		.then(session => {
			sendEmail(user, session)
		})
		.catch( error => {
			console.log(error);
		});
};

export const broadcastEmailsToAll = () => {
	User.find({ is_email_on: true })
		.then( users => {
			users.forEach( user => {
				broadcastEmailToUser(user);
			});
		})
		.catch( error => {
			return console.log(error);
		});
};

export const sendEmail = (user, session) => {
	/*
	console.log('***SendEmail***');
	console.log('User', user);
	console.log('Items', session.items);
	console.log('Session', session);
	*/

	const email = new Email({
		user_id: user.id,
		session_id: session.id,
	});

	console.log(`Attempting email to ${user.email}...`);
	const request = constructEmailRequest(user.name, user.email, session.items, session.id);

	return sendgrid.API(request)
		.then(response => {
			console.log('Email Success - Status Code:', response.statusCode);
			return email.save();
		})
		.then((res) => {
			//console.log(res);
		})
		.catch(error => {
			console.log('Emailer Error', error.response.statusCode, error.response);
		});
};
