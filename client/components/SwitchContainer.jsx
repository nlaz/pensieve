import React from 'react';
import { connect } from 'react-redux';

import LandingContainer from '../app/landing/LandingContainer';
import ActivityContainer from '../app/activity/ActivityContainer';

class SwitchContainer extends React.Component {
  render() {
    return this.props.authenticated ? <ActivityContainer /> : <LandingContainer />;
  }
}

const mapStateToProps = state => ({
  authenticated: state.app.authenticated
});

export default connect(mapStateToProps)(SwitchContainer);
