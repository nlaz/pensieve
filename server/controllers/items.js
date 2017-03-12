import Item from '../models/item';

export const getItems = (req, res) => {
	const user = req.user;

	Item.find({ user_id: user._id }, (err, items) => {
		if (err) { return console.log(err); }
		res.send(items);
	});
};

export const getItem = (req, res) => {
	const itemId = req.params.item_id;
	const userId = req.user._id;
	Item.findOne({ _id: itemId, user_id: userId }, (err, item) => {
		if (err) { return console.log(err); }
		res.send(item);
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
