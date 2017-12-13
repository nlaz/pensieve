/*
 * DB script. Updates items to include
 * nextReviewDate and counter.
 */

import Item from "../models/item";
import configureDB from "../../config/db";

// Config DB
configureDB();

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
  .catch(err => console.log("Oops!", err));
