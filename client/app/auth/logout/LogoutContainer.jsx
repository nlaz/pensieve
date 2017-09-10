import React from 'react';
import { connect } from 'react-redux';

import * as sessionActions from '../authActions';

class LogoutContainer extends React.Component {
  componentWillMount() {
    this.props.logoutUser();
  }

  render() {
    return false;
  }
}

export default connect(null, sessionActions)(LogoutContainer);
