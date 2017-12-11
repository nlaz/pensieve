import Deck from "../models/deck";
import Item from "../models/item";
import mongoose from "mongoose";

export async function getDecks(req, res) {
  try {
    const decks = await Deck.find({ user: req.user._id });
    return res.status(200).json({ decks });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export async function getDeck(req, res) {
  const deckId = req.params.deck_id;
  const userId = req.user._id;

  try {
    const deck = await Deck.findOne({ _id: deckId, user: userId });
    const items = await Item.find({ user: userId, deck: deckId });

    return res.status(200).json({ deck: { ...deck.toObject(), items } });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

/**
 * Creates a deck object from API request data.
 * Constructs item objects after building a deck.
 */
export async function createDeck(req, res) {
  const userId = req.user._id;

  const deck = new Deck({
    user: userId,
    title: req.body.title,
    description: req.body.description,
  });

  try {
    return res.status(200).json({ deck: await deck.save() });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

/**
 * Edits a deck object from API request data.
 */
export async function editDeck(req, res) {
  const deckId = req.params.deck_id;
  const userId = req.user._id;

  try {
    let deck = await Deck.findOneAndUpdate(
      { _id: deckId, user: userId },
      { title: req.body.title, description: req.body.description },
      { new: true },
    );

    deck.items = await Item.find({ user: userId, deck: deckId });

    return res.status(200).json({ deck });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

/**
 * Delete the deck object. Deletes items within
 * the deck as well.
 */
export async function deleteDeck(req, res) {
  const deckId = req.params.deck_id;
  const userId = req.user._id;

  try {
    const items = await Item.remove({ deck: deckId, user: userId });
    const deck = await Deck.remove({ _id: deckId, user: userId });

    return res.status(200).json({ deck, items });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export async function resetDeck(req, res) {
  const deckId = req.params.deck_id;
  const userId = req.user._id;

  try {
    const deck = await Deck.findOne({ _id: deckId, user: userId });

    let items = await Item.update(
      { deck: deckId, user: userId },
      {
        $set: {
          repetitions: 0,
          EF: 2.5,
        },
        $unset: {
          nextReviewDate: 1,
          interval: 1,
          reviewedAt: 1,
        },
      },
      { multi: true, new: true },
    );

    items = await Item.find({ deck_id: deckId, user: userId });

    deck.items = items;
    return res.status(200).json({ deck });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
