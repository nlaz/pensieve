import Deck from '../models/deck';
import Item from '../models/item';

export async function getDecks(req, res) {
	try {
		const decks = await Deck.find({ user_id: req.user._id });
		return res.status(200).json({ decks });
	} catch (error) {
		return res.status(404).json({ error });
	}
}

export async function getDeck(req, res) {
	const deckId = req.params.deck_id;
	const userId = req.user._id;

	try {
		const deck = await Deck.findOne({ _id: deckId, user_id: userId });
		deck.items = await Item.find().where('_id').in(deck.items);

		return res.status(200).json({ deck });
	} catch (error) {
		return res.status(404).json({ error });
	}
}

/**
 * Creates a deck object from API request data.
 * Constructs item objects after building a deck.
 */
export async function createDeck(req, res) {
	if (req.body.items && req.body.items.length === 0) {
		return res.status(404).json({ error: 'Decks must have at least one item' });
	}

	try {
		const deck = await new Deck({
			user_id: req.user._id,
			title: req.body.title,
			description: req.body.description
		}).save();

		const itemObjs = req.body.items.map(item => ({
			...item,
			user_id: req.user._id,
			deck_id: deck._id
		}));

		const items = await Item.create(itemObjs);
		const itemIds = items.map(item => item._id);

		const newDeck = await Deck.findOneAndUpdate(
			{ _id: deck._id },
			{ items: itemIds },
			{ new: true }
		);

		return res.status(200).json({ deck: newDeck });
	} catch (error) {
		return res.status(404).json({ error });
	}
}

/**
 * Edits a deck object from API request data.
 * Constructs item objects after building a deck.
 */
export async function editDeck(req, res) {
	const deckId = req.params.deck_id;
	const userId = req.user._id;

	try {
		let deck = await Deck.findOne({ _id: deckId, user_id: userId });
		await Item.remove().where('_id').in(deck.items);

		const itemObjs = req.body.items.map(item => ({
			...item,
			user_id: req.user._id,
			deck_id: deck._id
		}));

		const items = await Item.create(itemObjs);
		const itemIds = items.map(item => item._id);

		deck = await Deck.findOneAndUpdate(
			{ _id: deck._id },
			{ items: itemIds, title: req.body.title, description: req.body.description },
			{ new: true }
		);

		deck.items = await Item.find().where('_id').in(deck.items);

		return res.status(200).json({ deck });
	} catch (error) {
		return res.status(404).json({ error });
	}
}

/**
 * Delete the deck object. Deletes items within
 * the deck as well.
 */
export async function deleteDeck(req, res) {
	try {
		const items = await Item.remove({ deck_id: req.params.deck_id });
		const deck = await Deck.remove({ _id: req.params.deck_id });
		return res.status(200).json({ deck, items });
	} catch (error) {
		return res.status(404).json({ error });
	}
}
