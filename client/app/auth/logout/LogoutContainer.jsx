import React from 'react';
import { connect } from 'react-redux';

import * as sessionActions from '../authActions';

class LogoutContainer extends React.Component {
  componentWillMount() {
    if (this.props.authenticated) {
      this.props.logoutUser();
    } else {
      this.props.router.push('/');
    }
  }

  componentDidUpdate() {
    if (!this.props.authenticated) {
      this.props.router.push('/');
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
