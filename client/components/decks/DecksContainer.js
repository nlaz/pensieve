import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../Header';
import * as deckActions from '../../actions/deckActions';

const DeckCard = ({ deck }) => (
  <div className='col-xs-3 deckCard--wrapper'>
    <Link to={`/decks/${deck._id}`} className='deckCard'>
      <span className='deckCard--itemCount'>
        {deck.items.length}
				<span className='glyphicon glyphicon-file' aria-hidden='true' ></span>
      </span>
      <h4>{deck.title}</h4>
    </Link>
  </div>
);

class DecksContainer extends React.Component {
  componentWillMount() {
    if(!this.props.decks) {
      this.props.actions.fetchDecks();
    }
  }

  render() {
    const { decks } = this.props;
    return (
      <Header className='decks-page'>
        <div className='container'>
          <div className='row'>
           <h1>Decks page</h1>
            <div className='text-right col-xs-12'>
              <Link to='decks/new' className='newDeck--btn btn btn-primary'>
                New Deck +
              </Link>
            </div>
           {decks && decks.length > 0 && decks.map((deck, key) => (
             <DeckCard deck={deck} key={key} />
           ))}
          </div>
        </div>
      </Header>
    );
  }
}

const mapStateToProps = (state) => ({
  decks: state.data.decks,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(deckActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DecksContainer);
