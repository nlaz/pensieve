/**
 * Updates objects in db to update `item_id`(String) to `item` (ObjectId)
 */

import Review from "../models/review";
import configureDB from "../../config/db";
import mongoose from "mongoose";

configureDB();

Review.find()
  .then(reviews => {
    reviews.forEach(review => {
      review.item = mongoose.Types.ObjectId(review.item_id);
      review.item_id = undefined;
      review.save();
    });
  })
  .catch(err => console.log("Oops!", err));
