import React from 'react';
import moment from 'moment';

const NUM_WEEKS = 52;
const NUM_DAYS = 7;
const NUM_DAYS_IN_YEAR = NUM_WEEKS * NUM_DAYS;
const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;

const getSize = (numOfReviews, mostReviews) => {
  const sizes = ['sm', 'md', 'lg', 'xl'];
  const defaultSize = 'xs';
  return numOfReviews > 0
    ? sizes[Math.min(Math.floor(numOfReviews / (mostReviews / sizes.length)), sizes.length - 1)]
    : defaultSize;
};

const DotItem = ({ col, row, activity }) => {
  const currentDay = col * NUM_DAYS + row + 1;
  const currentDayFromNow = NUM_DAYS_IN_YEAR - currentDay;

  const item = activity[currentDayFromNow] || { numOfReviews: 0 };
  const size = getSize(item.numOfReviews, activity.mostReviews);

  return <div className={`dot dot-${size} dot-${currentDayFromNow} ${item.numOfReviews}`} />;
};

const getActivityData = (reviewData = []) => {
  const activity = {};
  let mostReviews = 0;
  let totalReviews = 0;

  reviewData.forEach(reviewItem => {
    const { numOfReviews, _id: { day, month, year } } = reviewItem;
    const dateUTC = Date.UTC(year, month - 1, day);
    const dayFromNow = Math.floor((new Date() - new Date(dateUTC)) / MILLISECONDS_IN_A_DAY);

    if (numOfReviews > mostReviews) {
      mostReviews = numOfReviews;
      activity.mostReviews = numOfReviews;
    }
    totalReviews += numOfReviews;
    activity[dayFromNow] = reviewItem;
  });

  activity.totalReviews = totalReviews;
  return activity;
};

const getDayLabels = () => {
  const today = moment();
  const rows = [...Array(NUM_DAYS)];

  return rows.map((_, index) => {
    let newDate = moment(today);
    return index % 2 === 1 ? newDate.subtract(index, 'days').format('ddd') : undefined;
  });
};

export default function ActivityGraph({ reviewItems }) {
  const columns = [...Array(NUM_WEEKS)];
  const rows = [...Array(NUM_DAYS)];
  const activity = getActivityData(reviewItems);
  const rowLabels = getDayLabels();

  return (
    <div className="activity">
      <p className="activity-reviewTotal">
        You reviewed <strong>{activity.totalReviews} items</strong> in the past year
        {activity.totalReviews > 100 && <span className="activity-emoji">🎉</span>}
      </p>
      <div className="activity-graph">
        <div className="col col-headers">
          {rowLabels.map((label, key) => (
            <div className="row" key={key}>
              {label}
            </div>
          ))}
        </div>
        {columns.map((_, colKey) => (
          <div className={`col col-${colKey}`} key={colKey}>
            {rows.map((_, rowKey) => (
              <div className={`row row-${rowKey}`} key={rowKey}>
                <DotItem col={colKey} row={rowKey} activity={activity} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
