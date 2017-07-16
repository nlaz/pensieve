import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../Header';
import * as deckActions from '../../actions/deckActions';

const DeckCard = ({ deck }) => {
  return (
    <div className='col-xs-3 deckCard--wrapper'>
      <div className='deckCard' style={{ margin: '5px', backgroundColor: '#fff', padding: '10px', height: '200px' }}>
        <p>{deck.title}</p>
      </div>
    </div>
  );
};

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
