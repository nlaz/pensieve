import mongoose from 'mongoose';

export default function() {
	const mongoURI = process.env.MONGODB_HOST;
	const mongoDB = mongoose.connect(mongoURI).connection;
	mongoDB.on('error', (err) => { console.log(err.message); });
	mongoDB.once('open', () => { console.log('Mongo connection open'); });
}
