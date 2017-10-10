import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as reviewActions from './reviewActions';
import * as itemActions from '../items/itemActions';

import Header from '../../components/Header';
import ProgressBar from './ReviewProgressBar';

export const REVIEW_TYPE = {
  EASY: 'easy',
  GOOD: 'good',
  HARD: 'hard'
};

const SessionPage = ({ children, title }) => (
  <Header className="session-page">
    <div className="container">
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <h2 className="page-header">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  </Header>
);

const SessionResultItem = ({ item }) => (
  <li className="list-group-item">
    {item.title}
    <span className="glyphicon glyphicon-ok pull-right green-check" aria-hidden="true" />
  </li>
);

const SessionResults = ({ items }) => (
  <div>
    <ul className="list-group">
      {items.map((item, key) => <SessionResultItem key={key} item={item} />)}
    </ul>
    <div className="text-right">
      <Link to="/" className="btn btn-primary">
        Back
      </Link>
    </div>
  </div>
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
    this.props.actions.fetchSession(this.props.params.sessionId);
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
        <Header className="session-page">
          <div className="container">
            <h3>No items available</h3>
          </div>
        </Header>
      );
    }

    if (!Object.keys(session).length > 0) {
      return (
        <Header className="session-page">
          <div className="container">
            <h3>Loading session</h3>
          </div>
        </Header>
      );
    }

    if (session.finishedAt || index > items.length - 1) {
      return (
        <SessionPage title="Results">
          <SessionResults items={items} />
        </SessionPage>
      );
    }

    const selectedItem = items[index];
    const itemContent = showAnswer ? selectedItem.description : selectedItem.title;

    return (
      <SessionPage title="Review">
        <ProgressBar progress={index / (items.length - 1) * 100} />
        <div className="panel panel-default">
          <div className="panel-body" onClick={this.onItemClick}>
            <h3 className="text-center" style={{ margin: '0' }}>
              {itemContent}
            </h3>
            <button
              onClick={e => this.onToggleHideItem(e, selectedItem)}
              className="reviewCard--hide btn btn-reset"
            >
              {selectedItem.hidden ? (
                <span className="glyphicon glyphicon-eye-close" aria-hidden="true" />
              ) : (
                <span className="glyphicon glyphicon-eye-open" aria-hidden="true" />
              )}
            </button>
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
                  Hard
                </button>
              </div>
              <div className="col-xs-4 text-center">
                <button
                  onClick={() => this.onNextAction(REVIEW_TYPE.GOOD)}
                  type="button"
                  className="btn btn-primary"
                >
                  Good
                </button>
              </div>
              <div className="col-xs-4 text-center">
                <button
                  onClick={() => this.onNextAction(REVIEW_TYPE.EASY)}
                  type="button"
                  className="btn btn-primary"
                >
                  Easy
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
      </SessionPage>
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
