/*
 * DB Seeder script. Adds default items to db
 * for testing.
 */
import { Item, User } from './db';

const testAddressEmail = process.env.TEST_EMAIL_ADDRESS || '';

const testUser1 = new User({
	name: 'Joe Smoe',
	email: testAddressEmail,
});

const testItem1 = new Item({
	value: 'Test Title 1',
)};

const testItem2 = new Item({
	value: 'Test Title 2',
});

const testItem3 = new Item({
	value: 'Test Title 3',
});

testUser1.save();
testItem1.save();
testItem2.save();
testItem3.save();
