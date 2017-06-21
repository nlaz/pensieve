/*
 * DB script. Updates items to include
 * nextReviewDate and counter.
 */

import Item from '../models/item';
import configDB from '../../config/db';

// Config DB
configDB();


Item.find()
  .then(items => {
    items.forEach(item => {
      if (!item.nextReviewDate) {
        item.nextReviewDate = new Date();
      }
      if (!item.counter) {
        item.counter = 0;
      }
      console.log(item);
      item.save();
    });
  })
  .catch(err => console.log('Oops!', err));
