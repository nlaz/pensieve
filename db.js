import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/boreas');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection error'));

const Schema = mongoose.Schema;

const testSchema = new Schema({
	value: String
});

export const Test = mongoose.model('Test', testSchema);
