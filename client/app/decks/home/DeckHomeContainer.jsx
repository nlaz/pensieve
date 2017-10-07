import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../../../components/Header';
import * as deckActions from '../deckActions';
import ItemCard from '../../items/ItemCard';

class DeckHomeContainer extends React.Component {
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

  render() {
    const { deck = {} } = this.props;
    const { items = [] } = deck;
    return (
      <Header className="deck-page">
        <div className="container margin-top">
          <div className="row margin-top">
            <div className="col-xs-4 deckInfo--wrapper">
              <div className="deckInfo">
                <h2 className="title">{deck.title}</h2>
                <p className="description">{deck.description}</p>
              </div>
              <div className="deck-actions">
                <button
                  onClick={() => this.onDeleteDeck()}
                  className="newDeck--btn btn btn-danger btn-default"
                  style={{ marginRight: '5px' }}
                >
                  Delete
                </button>
                <Link
                  to={`/decks/${deck._id}/edit`}
                  className="newDeck--btn btn btn-primary btn--default"
                >
                  Edit
                </Link>
              </div>
            </div>
            <div className="row col-xs-8">
              {items &&
                items.length > 0 &&
                items.map((item, key) => <ItemCard className="col-xs-4" item={item} key={key} />)}
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
  actions: bindActionCreators(deckActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckHomeContainer);
