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
    this.popover.toggle();
  }

  render() {
    const { reviewType } = this.state;
    const [numStudyItems, numLearnItems, numReviewItems] = [24, 40, 40];
    return (
      <div className="reviewButton">
        <button className="reviewButton-action button button--secondary">
          {reviewType === OPTION_TYPES.STUDY && (
            <span className="action">
              Study now <span className="items-due">{numStudyItems}</span>
            </span>
          )}
          {reviewType === OPTION_TYPES.LEARN && (
            <span className="action">
              Learn now <span className="items-due">{numLearnItems}</span>
            </span>
          )}
          {reviewType === OPTION_TYPES.REVIEW && (
            <span className="action">
              Review now <span className="items-due">{numReviewItems}</span>
            </span>
          )}
        </button>
        <Popover
          align="right"
          ref={c => (this.popover = c)}
          trigger={<button className="reviewButton-dropdown button button--secondary">▾</button>}
        >
          <div className="reviewOption" onClick={() => this.onChangeReview(OPTION_TYPES.STUDY)}>
            <span
              style={{ visibility: reviewType === OPTION_TYPES.STUDY ? 'visible' : 'hidden' }}
              className="glyphicon glyphicon-ok"
              aria-hidden="true"
            />
            <div>
              <p className="reviewOption-title">
                Study <span className="recommended">(Recommended)</span>
              </p>
              <p className="reviewOption-description">
                This session will maximize your recall of previous cards and introduce new cards you
                have not seen.
              </p>
            </div>
            <span className="reviewOption-count">{numStudyItems} cards</span>
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
                This session will introduce you to {numLearnItems} new cards that you have not seen
                before.
              </p>
            </div>
            <span className="reviewOption-count">{numLearnItems} cards</span>
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
                This session will strengthen your recall of {numReviewItems} cards that you have
                seen before.
              </p>
            </div>
            <span className="reviewOption-count">{numReviewItems} cards</span>
          </div>
        </Popover>
      </div>
    );
  }
}
