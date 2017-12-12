/*
 * DB script. Resets all items to default mode.
 */

import Item from '../models/item';
import configureDB from '../../config/db';

// Config DB
configureDB();

Item.find()
  .then(items => {
    items.forEach(item => {
      item.repetitions = 0;
      item.EF = 2.5;
      item.nextReviewDate = undefined;
      item.interval = undefined;
      item.reviewedAt = undefined;
      item.hidden = false;
      item.save();
    });
  })
  .catch(err => console.log('Oops!', err));
