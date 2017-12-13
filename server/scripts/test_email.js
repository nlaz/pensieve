import configureDB from '../../config/db';
import * as Emailer from '../controllers/emails';
import User from '../models/user';

configureDB();

const testUserId = '589a72ad50b48b715550680f';
const emailOne = () => {
  User.findById(testUserId)
    .then(user => {
      return Emailer.broadcastEmailToUser(user);
    })
    .catch(error => {
      console.error(error);
    });
};

emailOne();

// const emailAll = () => {
// 	Emailer.broadcastEmailsToAll();
// };

//emailAll();
