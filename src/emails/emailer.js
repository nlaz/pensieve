import sg, { mail as helper } from 'sendgrid';
import {
  UserEntity,
  ItemEntity,
  EmailEntity,
  ReviewSessionEntity,
} from '../db/schema';

const sendgrid = sg(process.env.SENDGRID_API_KEY);

const sourceEmail = new helper.Email('boreas@test.com');
const subject = 'Your Daily Review - Boreas';
const domain = process.env.HOST_URL;

const url = `${domain}/api/items`;

const template = (name, items) => {
	return (
	`<div>
		<p>Hi ${name},</p>

		<p>These are the items for you to review today:</p>
		<p>
		${items}
		</p>

		<a href='${url}' >See more</a>

		<p>Cheers!,</p>
		<p>Boreas</p>
	</div>`
	);
};

const constructEmailRequest = (targetName, targetEmail, items) => {
	const titles = items.map(item => item.title);
	const content = new helper.Content('text/html', template(targetName, titles));
	const mail = new helper.Mail(sourceEmail, subject, new helper.Email(targetEmail), content);
	return sendgrid.emptyRequest({
		method: 'POST',
		path: '/v3/mail/send',
		body: mail.toJSON(),
	});
};

const broadcastEmails = () => {
  UserEntity.find({is_email_on: true}, (err, users) => {
    if (err) { return console.log(err); }

    users.forEach((user) => {
      const itemQuery = ItemEntity.find({ user_id: user.id }).limit(6);
      itemQuery.exec((err, items) => {
        if (err) { return console.log(err); }

        console.log('Items:', items);
        const itemIds = items.map(item => item.id);
        const session = new ReviewSessionEntity({
          type: 'email',
          user_id: user.id,
          items: itemIds,
        });

        sendEmail(user, items, session)
          .then(response => {
            console.log('Success!');
            session.save();
          })
          .catch(error => {
            console.error('Uh oh!');
          });
      });
    });
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
  broadcastEmails: broadcastEmails,
}
