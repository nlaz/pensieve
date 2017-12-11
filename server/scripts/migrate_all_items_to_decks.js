/*
 * DB script. Updates all items that don't have a associated
 * deck object with a new default deck.
 */

import Deck from "../models/deck";
import Item from "../models/item";
import User from "../models/user";
import configDB from "../../config/db";

// Set up DB
configDB();

User.find()
  .then(users => {
    users.forEach(user => {
      Item.find({ deck: null, user_id: user._id })
        .then(items => {
          const itemIds = items.map(item => item._id);

          if (items.length > 0) {
            Deck.create(
              {
                user_id: user._id,
                title: "Items",
                description:
                  "Your items have been moved to this deck as individual items are no longer supported. All items are now organized under decks.",
                items: itemIds,
              },
              function(err, deck) {
                if (err) {
                  console.log("Oops!", err);
                  return;
                }

                items.forEach(item => {
                  item.deck = deck._id;
                  item.save();
                });
              },
            );
          }
        })
        .catch(err => console.log("Oops!", err));
    });
  })
  .catch(err => console.log("Oops!", err));
