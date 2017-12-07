import React from "react";
import { Link } from "react-router";

import PageTemplate from "../../components/pages/PageTemplate";

export class LandingContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onSignup = this.onSignup.bind(this);
  }

  onSignup(email) {
    this.props.actions.prelaunchSignUp({ email });
  }

  render() {
    const { isSuccess, hasErrored } = this.props;
    return (
      <PageTemplate className="landing-page">
        <div className="landing-hero">
          <div className="container">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <div className="landing-copy w-100">
                <h1 className="font-weight-bold">Remember anything with Pensieve</h1>
                <h2 className="h5">
                  Pensieve is a simple, open source, personal spaced repetition platform
                </h2>
                <Link to="/signup" className="btn btn-light mt-4">
                  Create account
                </Link>
              </div>
              <div className="landing-image mb-5">
                <img className="my-auto w-100" src={require("../../assets/img/landing_hero.png")} />
              </div>
            </div>
          </div>
        </div>
        <div className="landing-box bg-white py-5">
          <div className="container my-5">
            <div className="border w-100 py-5">
              <h4 className="text-center text-dark">
                You can use Pensieve to remember virtually anything that needs remembering
              </h4>
              <div className="d-flex justify-content-around align-items-center mt-3">
                <div className="flex-item emoji" style={{ fontSize: "110px" }}>
                  🔬
                </div>
                <div className="flex-item">
                  <p className="lead text-dark">Learn a language</p>
                  <p className="lead text-dark">Study medical terms</p>
                  <p className="lead text-dark">Memorize poetry</p>
                </div>
                <div className="flex-item">
                  <p className="lead text-dark">Prepare for law exams</p>
                  <p className="lead text-dark">Master trivia</p>
                  <p className="lead text-dark">Remember names and faces</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="landing-info py-5">
          <div className="container py-5 my-5">
            <div className="row">
              <div className="col-sm-6 offset-sm-3">
                <h4 className="text-center text-dark mb-3">Why Pensieve?</h4>
                <p className="lead text-dark">
                  Pensieve is for students, language learners, and autodidacts that are tired of
                  forgetting information after just learning it. It is for people that don't have
                  time to review their notes everyday. Pensieve solves this by automatically
                  scheduling reviews of your cards for you so you never have to forget it again.
                  <br />
                  <br />
                  Pensieve schedules these reviews at increasing intervals over time so that the
                  number of times you spend reviewing new information decreases as you move it from
                  short term to long term memory.
                </p>
                <h4 className="text-center text-dark mt-5 pt-3 mb-3">
                  Improve your studying for free
                </h4>
                <div className="text-center">
                  <Link to="/signup" className="btn btn-primary">
                    Create account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="landing-footer" />
      </PageTemplate>
    );
  }
}

export default LandingContainer;
