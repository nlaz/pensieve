/*
 * DB Seeder script. Adds default items to db
 * for testing.
 */
import { ItemEntity, UserEntity } from "./schema";
import configDB from "../../config/db";

// Config DB
configDB();

if (process.env.TEST_EMAIL_ADDRESS === undefined) {
  console.error("Please specify test email address");
}
const seedAddress = process.env.TEST_EMAIL_ADDRESS;

const testUser = new UserEntity();
testUser.name = "Jane Tester";
testUser.email = seedAddress;
testUser.password = testUser.generateHash("password");

const testItem1 = new ItemEntity({
  front: "Test Title 1",
  back: "Test Description 1",
});

const testItem2 = new ItemEntity({
  front: "Test Title 2",
  back: "Test Description 2",
});

testUser.save((err, res) => {
  if (err) return console.error(err);

  testItem1.user = res.id;
  testItem2.user = res.id;

  testItem1.save();
  testItem2.save();
});
