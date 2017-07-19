import Item from '../models/item';
import Review from '../models/review';
import REVIEW_TYPE from '../../client/components/sessions/SessionContainer';

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

export const createItem = (req, res) => {
	const item = new Item({
		user_id: req.user._id,
		title: req.body.title,
		description: req.body.description,
		nextReviewDate: new Date(),
		counter: 0,
	});

	item.save()
		.then( item => res.status(200).json({ item }))
		.catch( error => res.status(404).json({ error }));
};

export const editItem = (req, res) => {
	const { title, description, hidden } = req.body;
	const query = { _id: req.params.item_id };
	const update = { title, description, hidden };
	Object.keys(update).forEach(key => update[key] === undefined && delete update[key]);

	Item.findOneAndUpdate(query, update, { new: true })
		.then( item => res.status(200).json({ item }))
		.catch( error => res.status(404).json({ error }));
};

export const deleteItem = (req, res) => {
	Item.remove({ _id: req.params.item_id })
		.then( item => {
			return res.status(200).json({ item });
		})
		.catch( error => res.status(404).json({ error }));
};

export const reviewItem = (req, res) => {
	const itemId = req.params.item_id;
	const userId = req.user._id;

	const review = new Review({
		item_id: itemId,
		user_id: userId,
	});

	review.save()
		.then( () => {
			const query = { _id: itemId, user_id: userId };
			const update = { $inc: { reviewCount: 1 } };
			return Item.findOneAndUpdate(query, update, { new: true });
		})
		.then( () => res.status(200).json({ message: 'Success!'}))
		.catch( error => res.status(404).json({ error }));
};

//=0.75*EXP(0.8*I2) - 0.75
const getNextReviewDate = (counter) => {
	const currentTime = new Date();
	const interval = 0.75 * Math.exp(0.8 * counter) - 0.75;
	// TODO: update next date by interval. Not rounded integer.
	currentTime.getDate();
	currentTime.setDate( currentTime.getDate() + Math.ceil(interval) );
	return currentTime;
};

const getNewCounter = (value, prevCount) => {
	switch(value) {
		case REVIEW_TYPE.EASY:
			return prevCount + 1;
		case REVIEW_TYPE.GOOD:
			return prevCount;
		case REVIEW_TYPE.HARD:
			return 0;
	}
	return prevCount;
};

export const newReviewAction = (req, res) => {
	const itemId = req.params.item_id;
	const userId = req.user._id;
	const value = req.params.value;

	const review = new Review({
		item_id: itemId,
		user_id: userId,
		value: value,
	});

	review.save()
		.then( () => {
			return Item.findById( itemId );
		})
		.then((item) => {
			item.counter = getNewCounter(value, item.counter);
			item.nextReviewDate = getNextReviewDate(item.counter);

			return item.save();
		})
		.then((_item) => res.status(200).json({ item: _item }))
		.catch( error => res.status(404).json({ error }));
};

// Helper method for email generation
export const getDueItemsHelper = userId => {
	const currentTime = new Date();
	return Item.find({ user_id: userId, hidden: false })
		.where('nextReviewDate').lt(currentTime)
		.then(items => { return items; })
		.catch( error => { throw(error); });
};

export const getDueItems = (req, res) => {
	getDueItemsHelper(req.user._id)
		.then( items => res.status(200).json({ due_items: items }))
		.catch( error => res.status(404).json({ error }));
};
