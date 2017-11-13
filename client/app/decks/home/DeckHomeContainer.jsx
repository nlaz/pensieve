import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import pluralize from 'pluralize';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../../../components/Header';
import * as deckActions from '../deckActions';
import * as itemActions from '../../items/itemActions';
// import ItemCard from '../../items/ItemCard';

class DeckHomeContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onDeleteDeck = this.onDeleteDeck.bind(this);
    this.onHideItemClick = this.onHideItemClick.bind(this);
    this.onOverflowClick = this.onOverflowClick.bind(this);
  }
  componentWillMount() {
    const { deck, params } = this.props;
    if (!deck || deck._id !== params.deckId) {
      this.props.actions.fetchDeck(params.deckId);
    }
  }

  componentDidUpdate() {
    if (Object.keys(this.props.deck).length === 0) {
      this.props.router.push('/decks');
    }
  }

  onDeleteDeck() {
    const itemId = this.props.deck._id;
    this.props.actions.deleteDeck(itemId);
  }

  onHideItemClick(e, item) {
    e.preventDefault();
    e.stopPropagation();
    this.props.actions.toggleHideItem(item);
  }

  onOverflowClick(e) {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Toggle popover menu
  }

  render() {
    const { deck = {} } = this.props;
    const { items = [] } = deck;
    return (
      <Header className="DeckHomeContainer deck-page">
        <div className="container margin-top margin-bottom">
          <div className="row margin-top">
            <div className="deckHeader col-xs-12">
              <button className="deckActions--overflow">
                <span className="glyphicon glyphicon-option-vertical" aria-hidden="true" />
              </button>
              <h5 className="deckSubtitle">DECK</h5>
              <h1 className="deckTitle">{deck.title}</h1>
              <p className="deckDescription">{deck.description}</p>
              <span className="deckDetails">
                {moment(deck.createdAt).format('MMMM D, YYYY')} &middot;{' '}
                {pluralize('card', items.length, true)}
              </span>
              <div className="deckActions">
                <button className="button button--primary">Study Now</button>
                <button className="button button--default">Add Item</button>
              </div>
              <hr />
            </div>
            <div className="col-xs-12">
              <div className="deckHome-items">
                {items.length > 0 &&
                  items.map((item, key) => (
                    <Link
                      className={cx('deckHome-item', { 'deckHome-item--hidden': item.hidden })}
                      to={`/items/${item._id}`}
                      key={key}
                    >
                      <span className="title">{item.title}</span>
                      <div className="itemActions">
                        <div
                          onClick={e => this.onOverflowClick(e, item._id)}
                          className="itemAction-overflow"
                        >
                          <span
                            className="glyphicon glyphicon-option-horizontal"
                            aria-hidden="true"
                          />
                        </div>
                        <div
                          onClick={e => this.onHideItemClick(e, item)}
                          className="itemAction-hideItem"
                        >
                          {item.hidden ? (
                            <span className="glyphicon glyphicon-eye-close" aria-hidden="true" />
                          ) : (
                            <span className="glyphicon glyphicon-eye-open" aria-hidden="true" />
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Header>
    );
  }
}

const mapStateToProps = state => ({
  deck: state.data.deck
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...deckActions, ...itemActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckHomeContainer);
