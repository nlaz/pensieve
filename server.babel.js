import express from 'express';
import { Item } from './db';

const app = express();
const port = 3000;

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);

	Item.find({}, (err, res) => {
		if (err) { console.log(err); }
		console.log(res);
		console.log(res.length);
	});

	const item = new Item({ value: 'test' });
	item.save();
});
