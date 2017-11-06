import Item from '../models/item';
import Review from '../models/review';
import { REVIEW_TYPE } from '../../client/app/review/ReviewContainer';

export async function getItems(req, res) {
  try {
    const items = await Item.find({ user_id: req.user._id });
    return res.status(200).json({ items });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export async function getItem(req, res) {
  const itemId = req.params.item_id;
  const userId = req.user._id;

  try {
    const item = await Item.findOne({ _id: itemId, user_id: userId });

    return res.status(200).json({ item });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export async function createItem(req, res) {
  const item = new Item({
    user_id: req.user._id,
    title: req.body.title,
    description: req.body.description,
    nextReviewDate: new Date(),
    counter: 0
  });

  try {
    return res.status(200).json({ item: await item.save() });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export const editItem = (req, res) => {
  const { title, description, hidden } = req.body;
  const query = { _id: req.params.item_id };
  const update = { title, description, hidden };
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

//=0.75*EXP(0.8*I2) - 0.75
const getNextReviewDate = counter => {
  const currentTime = new Date();
  const interval = 0.75 * Math.exp(0.8 * counter) - 0.75;
  // TODO: update next date by interval. Not rounded integer.
  currentTime.setDate(currentTime.getDate() + Math.ceil(interval));
  return currentTime;
};

const getNewCounter = (value, prevCount) => {
  switch (value) {
    case REVIEW_TYPE.EASY:
      return prevCount + 1;
    case REVIEW_TYPE.GOOD:
      return prevCount;
    case REVIEW_TYPE.HARD:
      return 0;
  }
  return prevCount;
};

const getGrade = value => {
  switch (value) {
    case REVIEW_TYPE.EASY:
      return 5;
    case REVIEW_TYPE.GOOD:
      return 3;
    case REVIEW_TYPE.HARD:
      return 0;
  }
  return 3;
};

// Implements the SM2 algorithm created by Peter Wozniak
// @see https://www.supermemo.com/english/ol/sm2.htm
export async function reviewSM2Item(req, res) {
  const value = req.body.value;

  const review = new Review({
    item_id: req.params.item_id,
    user_id: req.user._id,
    value: req.params.value
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
      item.EF = Math.max(item.EF + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02)), 1.3);
      item.repetitions = item.repetitions + 1; // increment repetitions

      if (item.repetitions === 1) {
        item.interval = 1;
      } else if (item.repetitions === 2) {
        item.interval = 6;
      } else {
        item.interval = Math.round((item.interval - 1) * item.EF);
      }

      if (grade < 4) {
        item.interval = 0;
      }
    }
    const nextReviewDate = new Date();
    nextReviewDate.setHours(0, 0, 0, 0);
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
    value: req.params.value
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

// Helper method for email generation
export const getDueItemsHelper = userId => {
  const currentTime = new Date();
  return Item.find({ user_id: userId, hidden: false })
    .where('nextReviewDate')
    .lt(currentTime)
    .then(items => {
      return items;
    })
    .catch(error => {
      throw error;
    });
};

export const getDueItems = (req, res) => {
  getDueItemsHelper(req.user._id)
    .then(items => res.status(200).json({ due_items: items }))
    .catch(error => res.status(500).json({ error }));
};
