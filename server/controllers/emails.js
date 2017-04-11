import sg, { mail as helper } from 'sendgrid';
import Email from '../models/email';
import Item from '../models/item';
import Session from '../models/session';
import User from '../models/user';

import * as SessionController from './sessions';

const sendgrid = sg(process.env.SENDGRID_API_KEY);

const domain = process.env.HOST_URL;
const sourceEmail = new helper.Email('boreas@test.com');
const subjects = [
	'Start your morning with some knowledge - Boreas',
	'Well, Check This Out - Boreas',
	'Some fresh baked notes for you to review - Boreas',
	'Hey Good Looking - Boreas',
	'>>>>CLICK HERE<<<<< (Or Don\'t) - Boreas'
];

const template = (name, items, sessionId) => {
	const url = `${domain}/sessions/${sessionId}`;
	const cardStyle = 'border:1px solid #dddddd;border-radius:4px;font-size:18px;font-weight:bold;line-height:150px;text-align:center;text-decoration:none;width:250px;height:150px;';
	const buttonStyle = 'background-color:#2e78ba;border-radius:3px;color:#ffffff;line-height:30px;height:30px;text-align:center;text-decoration:none;width:100px;';

	return (
	`<div style='color:#000000;'>
		<p>Oh hey ${name},</p>

		<p>We got some fresh baked notes for you to review today. Here's a taste.</p>
		<br/>
		<div style='${cardStyle}'>
			<a href='${url}' style='color:#000000;text-decoration:none;'>${items[0].title}</a>
		</div>
		<br/>

		<div style='${buttonStyle}'>
			<a href='${url}' style='color:#ffffff;text-decoration:none;'>Review Now</a>
		</div>

		<p>Anyways that was fun. See you later!</p>

		<p>Your friend,</p>
		<p>Boreas</p>
	</div>`
	);
};

const constructEmailRequest = (targetName, targetEmail, items, sessionId) => {
	const subject = subjects[Math.floor(Math.random() * subjects.length)];
	const content = new helper.Content('text/html', template(targetName, items, sessionId));
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
