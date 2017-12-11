/**
 * Updates objects in `item` db fields `title` and `description`
 * to `front` and `back`.
 */

import Item from "../models/item";
import configDB from "../../config/db";
import mongoose from "mongoose";

configDB();

Item.find()
  .then(items => {
    items.forEach(item => {
      item.front = item.title;
      item.back = item.description;
      item.title = undefined;
      item.description = undefined;
      item.save(err => {
        if (err) console.log("Oops!", err);
      });
    });
  })
  .catch(err => console.log("Oops!", err));
