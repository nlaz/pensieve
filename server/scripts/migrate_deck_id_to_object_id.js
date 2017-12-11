/**
 * Updates objects in db to update `deck_id`(String) to `deck` (ObjectId)
 */

import Item from "../models/item";
import configDB from "../../config/db";
import mongoose from "mongoose";

configDB();

Item.find()
  .then(items => {
    items.forEach(item => {
      item.deck = mongoose.Types.ObjectId(item.deck_id);
      item.deck_id = undefined;
      item.save();
    });
  })
  .catch(err => console.log("Oops!", err));
