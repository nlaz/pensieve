import React from "react";
import pluralize from "pluralize";
import cx from "classnames";
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
      <PageTemplate className="study-container pt-5 pb-5" footer={<Footer anchor />}>
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2">
              <h5 className="mb-3">Choose your study type:</h5>
              <div className="list-group">
                <Link
                  to="/sessions/new"
                  className="study-group-item list-group-item list-group-action text-dark"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="font-weight-bold mb-1">
                      Daily study{" "}
                      <span className="font-weight-normal text-dark">(Recommended)</span>
                    </h5>
                    <div className="badge badge-secondary">
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
                    This session contains a mixture of new cards and previously seen cards. It
                    focuses on expanding your material while maximizing your recall of cards you
                    have already studied. This is good for balancing your learning session.
                  </p>
                </Link>
                <Link
                  to={`/sessions/new/${SESSION_TYPES.LEARN}`}
                  className="study-group-item list-group-item list-group-action text-dark"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="font-weight-bold mb-1">Learn new cards</h5>
                    <div
                      className={cx("badge", {
                        "badge-secondary": learn.size === 0,
                        "badge-info": learn.size > 0,
                      })}
                    >
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
                    This session only contains cards you have not seen yet. It focuses on
                    introducing you to new material and expanding your knowledge base. This is good
                    if you are trying to learn a lot of material in a short time.
                  </p>
                </Link>
                <Link
                  to={`/sessions/new/${SESSION_TYPES.REVIEW}`}
                  className="study-group-item list-group-item list-group-action text-dark"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="font-weight-bold mb-1">Review previous cards</h5>
                    <div
                      className={cx("badge", {
                        "badge-secondary": review.size === 0,
                        "badge-warning": review.size > 0,
                      })}
                    >
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
                    This session only contains cards you have already seen and need to review again.
                    It focuses on improving your recall of material you have already learned. These
                    items are due to be reviewed again and will not contain items you have just
                    learned.
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
