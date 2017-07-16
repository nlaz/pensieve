import React from 'react';
import { connect } from 'react-redux';

import Header from '../Header';

class DecksContainer extends React.Component {
  render() {
    return (
      <Header className='decks-page'>
        <h1>Decks Page</h1>
      </Header>
    );
  }
}

const mapStateToProps = (state) => ({
  decks: state.data.decks,
});

export default connect(mapStateToProps)(DecksContainer);
