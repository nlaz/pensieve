import sendgrid, { mail as helper } from 'sendgrid';

const sg = sendgrid(process.env.SENDGRID_API_KEY);

const sourceEmail = new helper.Email('test@example.com');
const subject = 'Albus - Test Email';
const content = new helper.Content('text/plain', 'This is a test email from Albus.\n\nCarry On,\nAlbus');

export const sendEmail = (targetEmail) => {
	console.log(`Attempting email to ${targetEmail}...`);
	const mail = new helper.Mail(sourceEmail, subject, new helper.Email(targetEmail), content);
	const request = sg.emptyRequest({
		method: 'POST',
		path: '/v3/mail/send',
		body: mail.toJSON(),
	});

	sg.API(request)
		.then(response => {
			console.log(response.statusCode);
			console.log(response.body);
			console.log(response.header);
		})
		.catch(error => {
			console.log('Emailer Error', error.response.statusCode, error.response);
		});
};
