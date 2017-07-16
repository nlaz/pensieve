import React from 'react';
import { connect } from 'react-redux';

import Header from '../Header';

class DeckContainer extends React.Component {
  render() {
    return (
      <Header className='deck-page'>
        <div className='container'>
          <div className='row'>
           <h1>Deck page</h1>
          </div>
        </div>
      </Header>
    );
  }
}

const mapStateToProps = (state) => ({
  decks: state.data.decks,
});

export default connect(mapStateToProps)(DeckContainer);
