import React from "react";
import { Link } from "react-router";

import Footer from "../../components/footer";
import PageTemplate from "../../components/pages/PageTemplate";
import { SESSION_TYPES } from "../../../server/controllers/constants";

class StudyContainer extends React.Component {
  render() {
    return (
      <PageTemplate className="StudyContainer pt-5" footer={<Footer anchor />}>
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-8 offset-sm-2">
              <h5 className="mb-3">Choose your study type:</h5>
              <div className="list-group">
                <Link to="/sessions/new" className="list-group-item list-group-action text-dark">
                  <div className="d-flex justify-content-between">
                    <h5 className="font-weight-bold mb-1">
                      Daily Study{" "}
                      <span className="font-weight-normal text-dark">(Recommended)</span>
                    </h5>
                    <small>12 out of 123 cards</small>
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
                  <div className="d-flex justify-content-between">
                    <h5 className="font-weight-bold mb-1">Learn</h5>
                    <small>12 out of 123 cards</small>
                  </div>
                  <p className="text-secondary">
                    This session will maximize your recall of previous cards and introduce new cards
                    you have not seen. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque malesuada magna vitae orci lacinia, a congue lacus iaculis.
                  </p>
                </Link>
                <Link
                  to={"/sessions/new/${SESSION_TYPES.REVIEW}"}
                  className="list-group-item list-group-action text-dark"
                >
                  <div className="d-flex justify-content-between">
                    <h5 className="font-weight-bold mb-1">Review</h5>
                    <small>12 out of 123 cards</small>
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

export default StudyContainer;
