import sg, { mail as helper } from 'sendgrid';
import { UserEntity, EmailEntity } from './db/schema';

const sendgrid = sg(process.env.SENDGRID_API_KEY);

const sourceEmail = new helper.Email('boreas@test.com');
const subject = 'Your Daily Review - Boreas';

const template = (name, items) => {
	return (
	`Hi ${name},

	These are the items for you to review today:
	${items}

	Cheers!,
	Boreas `
	);
};

const constructEmailRequest = (targetName, targetEmail, items) => {
	const titles = items.map(item => item.title);
	const content = new helper.Content('text/plain', template(targetName, titles));
	const mail = new helper.Mail(sourceEmail, subject, new helper.Email(targetEmail), content);
	return sendgrid.emptyRequest({
		method: 'POST',
		path: '/v3/mail/send',
		body: mail.toJSON(),
	});
};

const sendEmail = (user, items, session) => {
	console.log('***SendEmail***');
	console.log('User', user);
	console.log('Items', items);
	console.log('Session', session);

	const email = new EmailEntity({
		user_id: user.id,
		session_id: session.id,
	});

	console.log(`Attempting email to ${user.email}...`);
	const request = constructEmailRequest(user.name, user.email, items);

	return sendgrid.API(request)
		.then(response => {
			console.log('Email Success - Status Code:', response.statusCode);
			email.save((err, res) => {
				if (err) { return console.error(err); }
				console.log(res);
			});
		})
		.catch(error => {
			console.log('Emailer Error', error.response.statusCode, error.response);
		});
};

export default {
	sendEmail: sendEmail,
}
