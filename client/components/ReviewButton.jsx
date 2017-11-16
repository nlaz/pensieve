import React from 'react';
import Popover from './Popover';
import pluralize from 'pluralize';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as reviewActions from '../app/review/reviewActions';

const OPTION_TYPES = {
  STUDY: 0,
  LEARN: 1,
  REVIEW: 2
};

class ReviewButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = { reviewType: OPTION_TYPES.STUDY };
    this.onClick = this.onClick.bind(this);
    this.onChangeReview = this.onChangeReview.bind(this);
  }

  componentWillMount() {
    this.props.actions.fetchSessionTypes();
  }

  onClick() {
    const { reviewType } = this.state;
    browserHistory.push(`/sessions/new/${reviewType}`);
  }

  onChangeReview(value) {
    this.setState(() => ({ reviewType: value }));
    this.popover.toggle();
  }

  render() {
    const { reviewType } = this.state;
    const { counts = {} } = this.props.activity;
    return (
      <div className="reviewButton">
        <button onClick={this.onClick} className="reviewButton-action button button--secondary">
          {reviewType === OPTION_TYPES.STUDY && (
            <span className="action">
              Study now <span className="items-due">{counts.study_items}</span>
            </span>
          )}
          {reviewType === OPTION_TYPES.LEARN && (
            <span className="action">
              Learn now <span className="items-due">{counts.new_items}</span>
            </span>
          )}
          {reviewType === OPTION_TYPES.REVIEW && (
            <span className="action">
              Review now <span className="items-due">{counts.due_items}</span>
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
            <span className="reviewOption-count">
              {pluralize('card', counts.study_items, true)}
            </span>
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
                This session will introduce you to {counts.new_items} new{' '}
                {pluralize('card', counts.new_items)} that you have not seen before.
              </p>
            </div>
            <span className="reviewOption-count">{pluralize('card', counts.new_items, true)}</span>
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
                This session will strengthen your recall of{' '}
                {pluralize('card', counts.due_items, true)} that you already have seen before.
              </p>
            </div>
            <span className="reviewOption-count">{pluralize('card', counts.due_items, true)}</span>
          </div>
        </Popover>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(reviewActions, dispatch)
});
const mapStateToProps = state => ({
  activity: state.data.activity
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewButton);
