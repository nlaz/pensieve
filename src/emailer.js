import sg, { mail as helper } from 'sendgrid';

const sendgrid = sg(process.env.SENDGRID_API_KEY);

const sourceEmail = new helper.Email('boreas@test.com');
const subject = 'Your Daily Review - Boreas';

const constructEmailRequest = (targetName, targetEmail, items) => {
	const content = new helper.Content('text/plain', `These are the items for you to review today:\n\n${items}\n\nSee you tomorrow,\nBoreas`);
	const mail = new helper.Mail(sourceEmail, subject, new helper.Email(targetEmail), content);
	return sendgrid.emptyRequest({
		method: 'POST',
		path: '/v3/mail/send',
		body: mail.toJSON(),
	});
};

export const sendEmailToUser = (name, email, items) => {
	console.log(`Attempting email to ${email}...`);
	const request = constructEmailRequest(name, email, items);

	sendgrid.API(request)
		.then(response => {
			console.log('Email Success - Status Code:', response.statusCode);
		})
		.catch(error => {
			console.log('Emailer Error', error.response.statusCode, error.response);
		});

};
