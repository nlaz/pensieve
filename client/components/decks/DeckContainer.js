import React from 'react';
import { connect } from 'react-redux';

import Header from '../Header';

class DeckContainer extends React.Component {
  render() {
    return (
      <Header className='deck-page'>
        <h1>Deck Page</h1>
      </Header>
    );
  }
}

const mapStateToProps = (state) => ({
  decks: state.data.decks,
});

export default connect(mapStateToProps)(DeckContainer);
