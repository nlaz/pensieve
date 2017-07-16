import Deck from '../models/deck';
import Item from '../models/item';

export const getDecks = (req, res) => {
  Deck.find({ user_id: req.user._id })
    .then( decks => res.status(200).json({ decks }))
    .catch( error => res.status(404).json({ error }));
};

export const getDeck = (req, res) => {
  let deck;
  const deckId = req.params.deck_id;
  const userId = req.user._id;

  Deck.findOne({ _id: deckId, user_id: userId })
    .then( _deck => {
      deck = _deck;

      return Item.find().where('_id').in(deck.items);
    })
    .then( items => {
      deck.items = items;
      res.status(200).json({ deck: deck });
    })
    .catch( error => res.status(404).json({ error }));
};

/**
 * Creates a deck object from API request data.
 * Constructs item objects after building a deck.
 * Holds an array of item ids.
 * items structure:
  ]
 */
export const createDeck = (req, res) => {
  let savedId;
  if (req.body.items && req.body.items.length === 0) {
    return res.status(404).json({ error: 'Decks must have at least one item'});
  }
  const newDeck = new Deck({
    user_id: req.user._id,
    title: req.body.title,
    description: req.body.description,
  });

  newDeck.save()
    .then( deck => {
      savedId = deck._id;
      const itemObjs = req.body.items.map(item => ({
        ...item,
        user_id: req.user._id,
        deck_id: deck._id,
      }));

      return Item.create(itemObjs);
    })
    .then( items => {
      const itemIds = items.map(item => item._id);
      return Deck.findOneAndUpdate({ _id: savedId}, { items: itemIds }, { new: true });
    })
    .then( deck => res.status(200).json({ deck }))
    .catch( error => res.status(404).json({ error }));
};

/**
 * Delete the deck object. Deletes items within
 * the deck as well.
 */
export const deleteDeck = (req, res) => {
  Item.remove({ deck_id: req.params.deck_id })
    .then( () => Deck.remove({ _id: req.params.deck_id }))
    .then( () => res.status(200).json({ message: 'Success!' }))
    .catch( error => res.status(404).json({ error }));
};
