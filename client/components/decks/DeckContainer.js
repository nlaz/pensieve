import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as deckActions from '../../actions/deckActions';
import { ItemCard } from '../items/ItemsContainer';

import Header from '../Header';

class DeckContainer extends React.Component {
  componentWillMount() {
    const { deck, params } = this.props;
    if(!deck || deck._id !== params.deckId) {
      this.props.actions.fetchDeck(params.deckId);
    }
  }

  render() {
    const { deck = {} } = this.props;
    const { items = [] } = deck;
    return (
      <Header className='deck-page'>
        <div className='container'>
          <div className='row'>
            <h1>Deck page</h1>
            <div className='col-xs-12 text-right'>
              <Link to={`/decks/${deck._id}/edit`} className='newDeck--btn btn btn--default'>Edit</Link>
            </div>

            <div className='col-xs-3 deckInfo--wrapper'>
              <div className='deckInfo'>
                <h4>{deck.title}</h4>
                <p>{deck.description}</p>
              </div>
            </div>
            <div className='row col-xs-9'>
              {items && items.length > 0 && items.map((item, key) => (
                <ItemCard className='col-xs-4' item={item} key={key} />
              ))}
            </div>
          </div>
        </div>
      </Header>
    );
  }
}

const mapStateToProps = (state) => ({
  deck: state.data.deck,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(deckActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckContainer);
