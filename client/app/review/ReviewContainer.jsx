import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as reviewActions from './reviewActions';
import * as itemActions from '../items/itemActions';
import { getNextInterval, getEF } from '../../../server/controllers/utils';

import Footer from '../../components/Footer';
import PageTemplate from '../../components/PageTemplate';
import ProgressBar from './ReviewProgressBar';

export const REVIEW_TYPE = {
  EASY: 'easy',
  GOOD: 'good',
  HARD: 'hard'
};

export const REVIEW_GRADES = {
  EASY: 0,
  GOOD: 3,
  HARD: 5
};

moment.locale('shortened', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: '1 s',
    ss: '%d s',
    m: '1 m',
    mm: '%d m',
    h: '1 h',
    hh: '%d h',
    d: '1 d',
    dd: '%d d',
    M: '1 mo',
    MM: '%d mo',
    y: '1 yr',
    yy: '%d yr'
  }
});

const getIntervals = item => {
  return Object.values(REVIEW_GRADES).map(grade => {
    const newItem = { ...item, EF: getEF(item.EF, grade) };
    const interval = getNextInterval(newItem, grade);

    const reviewTime = moment().add(interval, 'days');
    const displayTime = moment.max(moment().add(1, 'minute'), reviewTime);
    return moment().to(displayTime, true);
  });
};

const SessionResultItem = ({ item }) => (
  <li className="list-group-item">
    {item.title}
    <span className="glyphicon glyphicon-ok pull-right green-check" aria-hidden="true" />
  </li>
);

const SessionResults = ({ items }) => (
  <PageTemplate className="session-page margin-top" footer={<Footer />}>
    <div className="container margin-top">
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <div className="session-header">
            <h5>RESULTS</h5>
          </div>
          <ul className="list-group">
            {items.map((item, key) => <SessionResultItem key={key} item={item} />)}
          </ul>
          <div className="text-right">
            <Link to="/" className="button button--primary">
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  </PageTemplate>
);

class ReviewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onToggleHideItem = this.onToggleHideItem.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
    this.onNextAction = this.onNextAction.bind(this);
    this.state = { index: 0, showAnswer: false, showNextOptions: false, items: props.items };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.props.items) {
      this.setState({ items: nextProps.items });
    }
  }

  componentWillMount() {
    if (Object.keys(this.props.session).length === 0) {
      this.props.actions.fetchSession(this.props.params.sessionId);
    }
  }

  onNextAction(value) {
    const { index, items } = this.state;
    const { session } = this.props;

    // Set the response value of the item
    items[index].value = value;

    const selectedItem = { ...items[index] };
    const updatedItems = value === REVIEW_TYPE.HARD ? [...items, selectedItem] : items;

    // Send the review request
    this.props.actions.reviewItem({ value, itemId: items[index]._id });

    if (index === updatedItems.length - 1) {
      this.props.actions.finishSession(session._id);
    }

    // Update state
    this.setState({
      index: index + 1,
      showNextOptions: false,
      showAnswer: false,
      items: updatedItems
    });
  }

  onItemClick() {
    this.setState({
      showNextOptions: true,
      showAnswer: !this.state.showAnswer
    });
  }

  onToggleHideItem(e, item) {
    e.preventDefault();
    e.stopPropagation();
    this.props.actions.toggleHideItem(item);
  }

  render() {
    const { session } = this.props;
    const { index, showAnswer, showNextOptions, items = {} } = this.state;

    if (!Object.keys(items).length > 0) {
      return (
        <PageTemplate className="session-page" footer={<Footer />}>
          <div className="col-md-8 col-md-offset-2 text-center margin-top">
            <span style={{ fontSize: '80px', fontWeight: 'bold' }}>😅</span>
            <h3 style={{ marginBottom: '40px' }}>Oops, something seems to have gone wrong.</h3>
            <Link to="/" className="button button--primary">
              Go Home
            </Link>
          </div>
        </PageTemplate>
      );
    }

    if (session.finishedAt || index > items.length - 1) {
      return <SessionResults items={items} />;
    }

    const selectedItem = items[index];
    const itemContent = showAnswer ? selectedItem.description : selectedItem.title;
    const intervals = getIntervals(selectedItem);

    return (
      <PageTemplate className="session-page margin-top" footer={<Footer />}>
        <div className="container margin-top">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="session-header">
                <h5>REVIEW</h5>
                <p className="session-count">
                  <span style={{ fontWeight: 'bold' }}>{index + 1}</span> out of {items.length}
                </p>
              </div>
              <ProgressBar progress={index / items.length * 100} />
              <div className="panel panel-default">
                <div className="panel-body" onClick={this.onItemClick}>
                  <h3 className="text-center" style={{ margin: '0' }}>
                    {itemContent}
                  </h3>
                </div>
              </div>
              <div className="review-actions">
                {showNextOptions ? (
                  <div className="row">
                    <div className="col-xs-4 text-center">
                      <button
                        onClick={() => this.onNextAction(REVIEW_TYPE.HARD)}
                        type="button"
                        className="btn btn-primary"
                      >
                        Again{' '}
                        {intervals && <span className="interval">{` < ${intervals[0]}`}</span>}
                      </button>
                    </div>
                    <div className="col-xs-4 text-center">
                      <button
                        onClick={() => this.onNextAction(REVIEW_TYPE.GOOD)}
                        type="button"
                        className="btn btn-primary"
                      >
                        Good {intervals && <span className="interval">{` < ${intervals[1]}`}</span>}
                      </button>
                    </div>
                    <div className="col-xs-4 text-center">
                      <button
                        onClick={() => this.onNextAction(REVIEW_TYPE.EASY)}
                        type="button"
                        className="btn btn-primary"
                      >
                        Easy {intervals && <span className="interval">{` < ${intervals[2]}`}</span>}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-xs-12 text-center">
                      <button onClick={this.onItemClick} type="button" className="btn btn-primary">
                        Show Answer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </PageTemplate>
    );
  }
}

const mapStateToProps = state => ({
  session: state.data.session,
  items: state.data.session.items
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...reviewActions, ...itemActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewContainer);
