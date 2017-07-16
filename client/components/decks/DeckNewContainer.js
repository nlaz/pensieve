import React from 'react';
import { connect } from 'react-redux';

import Header from '../Header';

class DeckNewContainer extends React.Component {
  render() {
    return (
      <Header className='newDeck-page'>
        <h1>New deck page</h1>
      </Header>
    );
  }
}

const mapStateToProps = (state) => ({
  decks: state.data.decks,
});

export default connect(mapStateToProps)(DeckNewContainer);
