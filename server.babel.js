import express from 'express';
import { Test } from './db';

const app = express();
const port = 3000;

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
	Test.find({}, (err, res) => {
		if (err) { console.log(err); }
		console.log(res);
		console.log(res.length);
	});

	const test = new Test({ value: 'test' });
	test.save();
});
