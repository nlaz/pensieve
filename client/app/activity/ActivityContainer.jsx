import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as homeActions from './activityActions';
import * as itemActions from '../items/itemActions';

const PageHead = ({ children }) => {
  return (
    <div className="sessions-page container">
      <div className="col-md-8 col-md-offset-2">
        <h4 className="page-header">Recent Activity</h4>
        {children}
      </div>
    </div>
  );
};

const getSize = (numOfReviews, mostReviews) => {
  const sizes = ['sm', 'md', 'lg', 'xl'];
  const defaultSize = 'xs';
  return numOfReviews > 0
    ? sizes[Math.min(Math.floor(numOfReviews / (mostReviews / sizes.length)), sizes.length - 1)]
    : defaultSize;
};

const NUM_WEEKS = 52;
const NUM_DAYS = 7;
const NUM_DAYS_IN_YEAR = NUM_WEEKS * NUM_DAYS;
const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;

const DotItem = ({ col, row, activity }) => {
  const currentDay = col * NUM_DAYS + row + 1;
  const currentDayFromNow = NUM_DAYS_IN_YEAR - currentDay;

  const item = activity[currentDayFromNow] || { numOfReviews: 0 };
  const size = getSize(item.numOfReviews, activity.mostReviews);

  return <div className={`dot dot-${size} dot-${currentDayFromNow} ${item.numOfReviews}`} />;
};

const ActivityGraph = ({ activity }) => {
  const columns = [...Array(NUM_WEEKS)];
  const rows = [...Array(NUM_DAYS)];

  return (
    <div className="activity">
      <p className="activity--reviewTotal">
        You reviewed <strong>{activity.totalReviews} items</strong> in the past year
      </p>
      <div className="graph">
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

class ActivityContainer extends React.Component {
  componentWillMount() {
    if (!this.props.sessions) {
      this.props.homeActions.fetchActivity();
    }
  }

  render() {
    const { reviewItems } = this.props;
    const activity = getActivityData(reviewItems);

    return (
      <PageHead>
        <div className="sectionTitle">Activity</div>
        <ActivityGraph activity={activity} />
      </PageHead>
    );
  }
}

const mapStateToProps = state => ({
  reviewItems: state.data.reviewItems
});

const mapDispatchToProps = dispatch => ({
  homeActions: bindActionCreators(homeActions, dispatch),
  itemActions: bindActionCreators(itemActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityContainer);
