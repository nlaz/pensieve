import Item from "../models/item";
import Deck from "../models/deck";
import Review from "../models/review";

import { getGrade, getNextInterval, getNewCounter, getNextReviewDate, getEF } from "./utils";

export async function getItem(req, res) {
  const itemId = req.params.item_id;
  const userId = req.user._id;
  const { fields } = req.query;

  try {
    const item = await Item.findOne({ _id: itemId, user: userId }).populate("deck");
    return res.status(200).json({ item });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export async function createItem(req, res) {
  const deckId = req.body.deck_id;
  const userId = req.user._id;

  const item = new Item({
    user: userId,
    front: req.body.front,
    back: req.body.back,
    deck: deckId,
  });

  try {
    return res.status(200).json({ item: await item.save() });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export const editItem = (req, res) => {
  const { front, back } = req.body;
  const query = { _id: req.params.item_id };
  const update = { front, back };

  Object.keys(update).forEach(key => update[key] === undefined && delete update[key]);

  Item.findOneAndUpdate(query, update, { new: true })
    .then(item => res.status(200).json({ item }))
    .catch(error => res.status(500).json({ error }));
};

export const deleteItem = (req, res) => {
  Item.remove({ _id: req.params.item_id })
    .then(item => {
      return res.status(200).json({ item });
    })
    .catch(error => res.status(500).json({ error }));
};

// Implements the SM2 algorithm created by Peter Wozniak
// @see https://www.supermemo.com/english/ol/sm2.html
export async function reviewItem(req, res) {
  const value = req.body.value;

  const review = new Review({
    item: req.params.item_id,
    user: req.user._id,
    value: req.params.value,
  });

  try {
    const newReview = await review.save();
    const item = await Item.findById(newReview.item);
    const grade = getGrade(value);

    item.reviewedAt = new Date();
    if (grade < 3) {
      item.repetitions = 0;
      item.interval = 0;
    } else {
      item.repetitions = item.repetitions + 1; // increment repetitions
      item.EF = getEF(item.EF, grade);
      item.interval = getNextInterval(item, grade);
    }
    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + item.interval);
    item.nextReviewDate = nextReviewDate;

    const newItem = await item.save();
    return res.status(200).json({ item: newItem });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export async function resetItem(req, res) {
  const userId = req.user._id;
  const itemId = req.params.item_id;

  try {
    let item = await Item.findOne({ _id: itemId, user: userId }).populate("deck");

    item.repetitions = 0;
    item.EF = 2.5;
    item.nextReviewDate = undefined;
    item.interval = undefined;
    item.reviewedAt = undefined;

    item = await item.save();

    return res.status(200).json({ item });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

// Helper method for email generation
export const getDueItemsHelper = userId => {
  const currentTime = new Date();
  return Item.find({ user: userId })
    .populate("deck")
    .where("nextReviewDate")
    .lt(currentTime)
    .then(items => {
      return items;
    })
    .catch(error => {
      throw error;
    });
};

export const getNewItemsHelper = userId => {
  return Item.find({ user: userId, repetitions: 0 }).populate("deck");
};

export const getDueItems = (req, res) => {
  getDueItemsHelper(req.user._id)
    .then(items => res.status(200).json({ due_items: items }))
    .catch(error => res.status(500).json({ error }));
};
