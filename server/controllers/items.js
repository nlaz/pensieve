import Item from '../models/item';
import Review from '../models/review';

export const getItems = (req, res) => {
	Item.find({ user_id: req.user._id })
		.then( items => res.status(200).json({ items }))
		.catch( error => res.status(404).json({ error }));
};

export const getItem = (req, res) => {
	const itemId = req.params.item_id;
	const userId = req.user._id;

	Item.findOne({ _id: itemId, user_id: userId })
		.then( item => res.status(200).json({ item }))
		.catch( error => res.status(404).json({ error }));
};

export const createItem = (req, res, next) => {
	const item = new Item({
		user_id: req.user._id,
		title: req.body.title,
		description: req.body.description,
	});

	item.save()
		.then( item => res.status(200).json({ item }))
		.catch( error => res.status(404).json({ error }));
};

export const editItem = (req, res) => {
	const { title, description } = req.body;
	const query = { _id: req.params.item_id };
	const update = { title, description };

	Item.findOneAndUpdate(query, update, { new: true })
		.then( item => res.status(200).json({ item }))
		.catch( error => res.status(404).json({ error }));
};

export const deleteItem = (req, res) => {
	Item.remove({ _id: req.params.item_id })
		.then( () => res.status(200))
		.catch( error => res.status(404).json({ error }));
};

export const reviewItem = (req, res, next) => {
	const review = new Review({
		item_id: req.params.item_id,
		user_id: req.user._id,
	});

	review.save()
		.then( review => res.status(200))
		.catch( error => res.status(404).json({ error }));
};
