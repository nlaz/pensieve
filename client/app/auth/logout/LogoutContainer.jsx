import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import * as sessionActions from '../authActions';

class LogoutContainer extends React.Component {
  componentWillMount() {
    if (this.props.authenticated) {
      this.props.logoutUser();
    } else {
      browserHistory.push('/');
    }
  }

  componentDidUpdate(nextProps) {
    if (!nextProps.authenticated) {
      browserHistory.push('/');
    }
  }

  render() {
    return false;
  }
}

const mapStateToProps = state => ({
  authenticated: state.app.authenticated
});

export default connect(mapStateToProps, sessionActions)(LogoutContainer);
