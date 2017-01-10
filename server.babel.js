import express from 'express';
import { Item } from './db';
import mongoose from 'mongoose';

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

	Item.find({}, (err, res) => {
		if (err) { console.log(err); }
		console.log(res);
		console.log(res.length);
	});
});
