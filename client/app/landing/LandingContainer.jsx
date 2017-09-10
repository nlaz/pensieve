import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as emailActions from './emailActions';
import { EmailSignupForm } from './EmailSignupForm';
import PageTemplate from '../../components/PageTemplate';
import Header from '../../components/Header';

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
      <PageTemplate
        header={<Header className="landing-page" />}
        footer={
          <div className="landing-footer text-center">
            <div className="footer-item">
              <span>Pensieve &copy; 2017</span>
            </div>
            {'|'}
            <div className="footer-item">
              <a href="mailto:info@boreas.space">Contact</a>
            </div>
          </div>
        }
      >
        <div className="container" style={{ display: 'flex' }}>
          <div className="landing-copy col-sm-8 col-md-6" style={{ margin: 'auto' }}>
            <h4 className="coming-soon">COMING SOON</h4>
            <h1 className="title">Cut your study time in half</h1>
            <h4 className="subtitle">
              <strong>Learn smarter.</strong> Pensieve uses intelligent flashcards to find the best
              time for you to review so you learn better.
            </h4>
            <EmailSignupForm
              isSuccess={isSuccess}
              hasErrored={hasErrored}
              onSignup={this.onSignup}
            />
          </div>
          <div className="landing-image col-sm-4 col-md-6" />
        </div>
      </PageTemplate>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(emailActions, dispatch)
});

const mapStateToProps = state => ({
  isSuccess: state.prelaunch.isSuccess,
  hasErrored: state.prelaunch.hasErrored
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer);
