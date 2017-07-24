import Review from '../models/review';

export const getActivity = (req, res) => {
  Review.find({ user_id: req.user._id })
    .then( reviews => res.status(200).json({ activity: reviews }))
    .catch( error => res.status(404).json({ error }));
};

export const getReviewItems = (req, res) => {
  return Review.aggregate([
     { $group: {
       _id : { month: { $month: '$createdAt' }, day: { $dayOfMonth: '$createdAt' }, year: { $year: '$createdAt' } },
       numOfReviews: { $sum: 1 },
     } },
     { $limit: 365 } // TODO: change to limit by date
  ]).exec()
  .then( reviewItems => {
    return res.status(200).json({ reviewItems: reviewItems });
  })
  .catch(error => res.status(404).json({ error }));
};
