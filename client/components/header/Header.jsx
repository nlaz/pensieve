import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { browserHistory } from "react-router";

import * as appActions from "../../app/appActions";

import NavBar from "../navbar/NavBar";
import { FlashMessage } from "../flashMessage/FlashMessage";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
  }

  componentDidMount() {
    this.unlisten = browserHistory.listen(() => {
      this.props.appActions.dismissFlash();
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  onClose(e) {
    e.preventDefault();
    this.props.appActions.dismissFlash();
  }

  render() {
    const { authenticated, children, error, message, self, className } = this.props;

    return (
      <div className={className}>
        <NavBar self={self} authenticated={authenticated} />
        {message && <FlashMessage message={message} onDismiss={this.onClose} />}
        {children}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  appActions: bindActionCreators(appActions, dispatch),
});

const mapStateToProps = state => ({
  self: state.app.self,
  authenticated: state.app.authenticated,
  message: state.flash.message,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
