import React from 'react';
import { connect } from 'react-redux';

import Header from '../Header';

class DeckEditContainer extends React.Component {
  render() {
    return (
      <Header className='editDeck-page'>
        <h1>Edit Deck Page</h1>
      </Header>
    );
  }
}

const mapStateToProps = (state) => ({
  decks: state.data.decks,
});

export default connect(mapStateToProps)(DeckEditContainer);
