import React from 'react';
import Popover from './Popover';

const OPTION_TYPES = {
  STUDY: 'study',
  LEARN: 'learn',
  REVIEW: 'review'
};

export default class ReviewButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = { reviewType: OPTION_TYPES.STUDY };
    this.onChangeReview = this.onChangeReview.bind(this);
  }

  onChangeReview(value) {
    this.setState(() => ({ reviewType: value }));
  }

  render() {
    const { reviewType } = this.state;
    return (
      <div className="reviewButton">
        <button className="reviewButton-action button button--secondary">
          <span className="action">Study Now</span> <span className="items-due">42</span>
        </button>
        <Popover
          align="right"
          trigger={<button className="reviewButton-dropdown button button--secondary">▾</button>}
        >
          <div className="reviewOption" onClick={() => this.onChangeReview(OPTION_TYPES.STUDY)}>
            <span
              style={{ visibility: reviewType === OPTION_TYPES.STUDY ? 'visible' : 'hidden' }}
              className="glyphicon glyphicon-ok"
              aria-hidden="true"
            />
            <div>
              <p className="reviewOption-title">Study</p>
              <p className="reviewOption-description">
                This session will maximize your recall of previous cards and introduce new cards you
                have not seen.
              </p>
            </div>
          </div>
          <div className="reviewOption" onClick={() => this.onChangeReview(OPTION_TYPES.LEARN)}>
            <span
              style={{ visibility: reviewType === OPTION_TYPES.LEARN ? 'visible' : 'hidden' }}
              className="glyphicon glyphicon-ok"
              aria-hidden="true"
            />
            <div>
              <p className="reviewOption-title">Learn</p>
              <p className="reviewOption-description">
                This session will introduce you to 23 new cards that you have not seen before.
              </p>
            </div>
          </div>
          <div className="reviewOption" onClick={() => this.onChangeReview(OPTION_TYPES.REVIEW)}>
            <span
              style={{ visibility: reviewType === OPTION_TYPES.REVIEW ? 'visible' : 'hidden' }}
              className="glyphicon glyphicon-ok"
              aria-hidden="true"
            />
            <div>
              <p className="reviewOption-title">Review</p>
              <p className="reviewOption-description">
                This session will strengthen your recall of 40 cards that you have seen before.
              </p>
            </div>
          </div>
        </Popover>
      </div>
    );
  }
}
