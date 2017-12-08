import Item from "../models/item";
import Deck from "../models/deck";
import Review from "../models/review";

import { getGrade, getNextInterval, getNewCounter, getNextReviewDate, getEF } from "./utils";

export async function getItems(req, res) {
  try {
    const items = await Item.find({ user_id: req.user._id });
    return res.status(200).json({ items });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export async function getItem(req, res) {
  let deck;
  const itemId = req.params.item_id;
  const userId = req.user._id;
  const { fields } = req.query;

  try {
    const item = await Item.findOne({ _id: itemId, user_id: userId });

    if (fields && fields.includes("deck")) {
      deck = await Deck.findOne({ _id: item.deck_id, user_id: userId });
    }

    return res.status(200).json({ item, deck });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export async function createItem(req, res) {
  const deckId = req.body.deck_id;
  const userId = req.user._id;

  const item = new Item({
    user_id: userId,
    title: req.body.title,
    description: req.body.description,
    deck_id: deckId,
  });

  try {
    return res.status(200).json({ item: await item.save() });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export const editItem = (req, res) => {
  const { title, description } = req.body;
  const query = { _id: req.params.item_id };
  const update = { title, description };

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
export async function reviewSM2Item(req, res) {
  const value = req.body.value;

  const review = new Review({
    item_id: req.params.item_id,
    user_id: req.user._id,
    value: req.params.value,
  });

  try {
    const newReview = await review.save();
    const item = await Item.findById(newReview.item_id);
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

export async function reviewItem(req, res) {
  const value = req.params.value;

  const review = new Review({
    item_id: req.params.item_id,
    user_id: req.user._id,
    value: req.params.value,
  });

  try {
    const newReview = await review.save();
    const item = await Item.findById(newReview.item_id);

    item.counter = getNewCounter(value, item.counter);
    item.nextReviewDate = getNextReviewDate(item.counter);

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
    let item = await Item.findOne({ _id: itemId, user_id: userId });

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
  return Item.find({ user_id: userId })
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
  return Item.find({ user_id: userId, repetitions: 0 });
};

export const getDueItems = (req, res) => {
  getDueItemsHelper(req.user._id)
    .then(items => res.status(200).json({ due_items: items }))
    .catch(error => res.status(500).json({ error }));
};
