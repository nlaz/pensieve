import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { NavBar } from './NavBar';
import { FlashMessage } from './FlashMessage';
import * as appActions from '../app/appActions';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
    this.onshowNavMenu = this.onshowNavMenu.bind(this);
    this.state = { showNavMenu: false };
  }

  onClose(e) {
    e.preventDefault();
    this.props.appActions.dismissError();
  }

  onshowNavMenu(showMenu) {
    this.setState({ showNavMenu: showMenu });
  }

  render() {
    const { authenticated, children, error, message, self, className } = this.props;
    const showMessage = Boolean(message);

    return (
      <div className={className}>
        <NavBar
          self={self}
          showNavMenu={this.state.showNavMenu}
          onshowNavMenu={this.onshowNavMenu}
          authenticated={authenticated}
        />
        {showMessage && <FlashMessage error={error} message={message} onDismiss={this.onClose} />}
        {children}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch)
});

const mapStateToProps = state => ({
  self: state.app.self,
  authenticated: state.app.authenticated,
  message: state.app.message,
  error: state.app.error
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
