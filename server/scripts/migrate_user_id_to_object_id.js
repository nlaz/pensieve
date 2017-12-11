/**
 * Updates objects in db to update `user_id`(String) to `user` (ObjectId)
 */

import Deck from "../models/deck";
import Item from "../models/item";
import Email from "../models/email";
import Session from "../models/session";
import Review from "../models/Review";
import configDB from "../../config/db";
import mongoose from "mongoose";

configDB();

Item.find()
  .then(items => {
    items.forEach(item => {
      item.user = mongoose.Types.ObjectId(item.user_id);
      item.user_id = undefined;
      item.save();
    });
  })
  .catch(err => console.log("Oops!", err));

Deck.find()
  .then(decks => {
    decks.forEach(deck => {
      deck.user = mongoose.Types.ObjectId(deck.user_id);
      deck.user_id = undefined;
      deck.save();
    });
  })
  .catch(err => console.log("Oops!", err));

Session.find()
  .then(sessions => {
    sessions.forEach(session => {
      session.user = mongoose.Types.ObjectId(session.user_id);
      session.user_id = undefined;
      session.save();
    });
  })
  .catch(err => console.log("Oops!", err));

Review.find()
  .then(reviews => {
    reviews.forEach(review => {
      review.user = mongoose.Types.ObjectId(review.user_id);
      review.user_id = undefined;
      review.save();
    });
  })
  .catch(err => console.log("Oops!", err));

Email.find()
  .then(emails => {
    emails.forEach(email => {
      email.user = mongoose.Types.ObjectId(email.user_id);
      email.user_id = undefined;
      email.save();
    });
  })
  .catch(err => console.log("Oops!", err));
