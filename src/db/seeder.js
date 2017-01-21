/*
 * DB Seeder script. Adds default items to db
 * for testing.
 */
import { ItemEntity, UserEntity } from './schema';

const seedAddress = process.env.TEST_EMAIL_ADDRESS || 'test@example.com';

const testUser1 = new UserEntity({
	name: 'Jane Tester',
	email: seedAddress,
	is_email_on: true
});

const testItem1 = new ItemEntity({
	title: 'Test Title 1',
	description: 'Test Description 1',
});

const testItem2 = new ItemEntity({
	title: 'Test Title 2',
	description: 'Test Description 2',
});

testUser1.save((err, res) => {
	if (err) return console.error(err);

	testItem1.user_id = res.id;
	testItem2.user_id = res.id;

	testItem1.save();
	testItem2.save();
});
