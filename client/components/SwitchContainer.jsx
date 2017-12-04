import React from "react";
import { connect } from "react-redux";

import LandingContainer from "../app/landing/LandingContainer";
import StudyContainer from "../app/study/StudyContainer";

class SwitchContainer extends React.Component {
  render() {
    return this.props.authenticated ? <StudyContainer /> : <LandingContainer />;
  }
}

const mapStateToProps = state => ({
  authenticated: state.app.authenticated,
});

export default connect(mapStateToProps)(SwitchContainer);
