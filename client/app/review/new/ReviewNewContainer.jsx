import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { SESSION_TYPES } from "../../../../server/controllers/constants";

import * as reviewActions from "../reviewActions";

import PageTemplate from "../../../components/pages/PageTemplate";

class ReviewNewContainer extends React.Component {
  componentWillMount() {
    const sessionType = this.props.params.sessionType;
    const { deckId } = this.props.location.query;
    this.props.actions.createSession({ sessionType, deckId });
  }

  render() {
    return (
      <PageTemplate className="pt-5">
        <div className="col-md-8 offset-md-2 text-center pt-5">
          <h3>Creating your study session...</h3>
        </div>
      </PageTemplate>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(reviewActions, dispatch),
});

export default connect(null, mapDispatchToProps)(ReviewNewContainer);
