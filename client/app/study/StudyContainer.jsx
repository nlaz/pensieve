import React from "react";
import pluralize from "pluralize";
import { Link } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as studyActions from "./studyActions";

import Footer from "../../components/footer";
import PageTemplate from "../../components/pages/PageTemplate";
import { SESSION_TYPES } from "../../../server/controllers/constants";

class StudyContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.actions.fetchStudyTypes();
  }

  render() {
    const { types = {} } = this.props.study;
    const { study = {}, learn = {}, review = {} } = types;

    return (
      <PageTemplate className="StudyContainer pt-5" footer={<Footer anchor />}>
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-8 offset-sm-2">
              <h5 className="mb-3">Choose your study type:</h5>
              <div className="list-group">
                <Link to="/sessions/new" className="list-group-item list-group-action text-dark">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="font-weight-bold mb-1">
                      Daily Study{" "}
                      <span className="font-weight-normal text-dark">(Recommended)</span>
                    </h5>
                    <div className="badge badge-info badge-pill">
                      {study.size === study.total ? (
                        <span>{pluralize("card", study.size, true)}</span>
                      ) : (
                        <span>
                          {study.size} out of {pluralize("card", study.total, true)}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-secondary">
                    This session will maximize your recall of previous cards and introduce new cards
                    you have not seen. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque malesuada magna vitae orci lacinia, a congue lacus iaculis.
                  </p>
                </Link>
                <Link
                  to={`/sessions/new/${SESSION_TYPES.LEARN}`}
                  className="list-group-item list-group-action text-dark"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="font-weight-bold mb-1">Learn</h5>
                    <div className="badge badge-info badge-pill">
                      {learn.size === learn.total ? (
                        <span>{pluralize("card", learn.size, true)}</span>
                      ) : (
                        <span>
                          {learn.size} out of {pluralize("card", learn.total, true)}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-secondary">
                    This session will maximize your recall of previous cards and introduce new cards
                    you have not seen. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque malesuada magna vitae orci lacinia, a congue lacus iaculis.
                  </p>
                </Link>
                <Link
                  to={`/sessions/new/${SESSION_TYPES.REVIEW}`}
                  className="list-group-item list-group-action text-dark"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="font-weight-bold mb-1">Review</h5>
                    <div className="badge badge-info badge-pill">
                      {review.size === review.total ? (
                        <span>{pluralize("card", review.size, true)}</span>
                      ) : (
                        <span>
                          {review.size} out of {pluralize("card", review.total, true)}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-secondary">
                    This session will maximize your recall of previous cards and introduce new cards
                    you have not seen. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque malesuada magna vitae orci lacinia, a congue lacus iaculis.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PageTemplate>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(studyActions, dispatch),
});

const mapStateToProps = state => ({
  study: state.data.study,
});

export default connect(mapStateToProps, mapDispatchToProps)(StudyContainer);
