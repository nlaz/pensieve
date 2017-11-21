import React from 'react';
import { connect } from 'react-redux';

import LandingContainer from '../app/landing/LandingContainer';
import DecksContainer from '../app/decks/DecksContainer';

class SwitchContainer extends React.Component {
  render() {
    return this.props.authenticated ? <DecksContainer /> : <LandingContainer />;
  }
}

const mapStateToProps = state => ({
  authenticated: state.app.authenticated
});

export default connect(mapStateToProps)(SwitchContainer);
