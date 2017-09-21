import Review from '../models/review';
import Deck from '../models/deck';
import { getDueItemsHelper } from './items';

export const getActivity = (req, res) => {
  Review.find({ user_id: req.user._id })
    .then(reviews => res.status(200).json({ activity: reviews }))
    .catch(error => res.status(404).json({ error }));
};

export async function getReviewItems(req, res) {
  const userId = req.user._id;
  try {
    const reviewItems = await Review.aggregate([
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' },
            year: { $year: '$createdAt' }
          },
          numOfReviews: { $sum: 1 }
        }
      },
      { $limit: 365 } // TODO: change to limit by date
    ]).exec();

    const popularDecks = await Deck.find({ user_id: userId });
    const dueItems = await getDueItemsHelper(userId);

    return res
      .status(200)
      .json({ reviewItems: reviewItems, popularDecks: popularDecks, dueItems: dueItems });
  } catch (error) {
    console.log('error', error);
    return res.status(404).json({ error });
  }
}
