import Item from '../models/item';
import Review from '../models/review';

export const getItems = (req, res) => {
	Item.find({ user_id: req.user._id }, (err, items) => {
		if (err) { return console.log(err); }

		res.status(200).json({ items: items });
	});
};

export const getItem = (req, res) => {
	const itemId = req.params.item_id;
	const userId = req.user._id;
	Item.findOne({ _id: itemId, user_id: userId }, (err, item) => {
		if (err) { return console.log(err); }

		res.status(200).json({ item: item });
	});
};

export const createItem = (req, res, next) => {
	const item = new Item({
		user_id: req.user._id,
		title: req.body.title,
		description: req.body.description,
	});

	item.save((err) => {
		if (err) {
			res.send({ error: err });
			return next(err);
		}

		return res.status(200).json({
			message: 'Item successfully saved!',
			item: item,
		});
	});
};

export const editItem = (req, res) => {
	const query = { _id: req.params.item_id };
	const update = {
		title: req.body.title,
		description: req.body.description,
	};

	Item.findOneAndUpdate(query, update, { new: true }, (err, item) => {
		if (err) { return res.send({ error: err }); }

		return res.status(200).json({
			message: 'Item successfully saved!',
			item: item,
		});
	});
};

export const deleteItem = (req, res) => {
	Item.remove({ _id: req.params.item_id }, (err) => {
		if (err) { return res.send({ error: err }); }

		Item.find({ user_id: req.user._id }, (err, items) => {
			if (err) { return console.log(err); }

			res.status(200).json({
				message: 'Item successfully removed',
				items: items,
			});
		});
	});
};

export const reviewItem = (req, res, next) => {
	const review = new Review({
		item_id: req.params.item_id,
		user_id: req.user._id,
	});

	review.save((err) => {
		if (err) {
			res.send({ error: err });
			return next(err);
		}

		return res.status(200).json({
			message: 'Review successfully saved!',
		});
	});
};
