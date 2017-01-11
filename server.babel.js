import express from 'express';
import mongoose from 'mongoose';
import { Item, User } from './db';
import { sendEmail } from './emailer';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/api/items', (req, res) => {
	Item.find({}, (err, items) => {
		if (err) { console.log(err); }
		return res.send(items);
	});
});

app.get('/api/items/:itemId', (req, res) => {
	Item.findById(req.params.itemId, (err, item) => {
		if (err) { console.log(err); }
		return res.send(item);
	});
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);

	User.find({}, (err, res) => {
		if (err) { console.log(err); }
		console.log(`${res.length} Users`);
		console.log(res);
		res.map(user => sendEmail(user.email));
	});

	Item.find({}, (err, res) => {
		if (err) { console.log(err); }
		console.log(`${res.length} Items`);
		console.log(res);
	});
});
