import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as sessionActions from '../authActions';

import PageTemplate from '../../../components/pages/PageTemplate';
import Footer from '../../../components/footer';

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentWillMount() {
    if (this.props.authenticated) {
      this.props.router.push('/');
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.authenticated) {
      nextProps.router.push('/');
    }
  }

  onChange(event) {
    const field = event.target.name;
    this.setState({ [field]: event.target.value });
  }

  onSave(event) {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.actions.loginUser({ email, password });
  }

  render() {
    return (
      <PageTemplate className="login-page" footer={<Footer />}>
        <div className="login-form container">
          <div className="row">
            <div className="col-sm-8 offset-sm-2 col-md-6 offset-md-3">
              <h3>Login</h3>
              <form onSubmit={e => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="emailInput">Email</label>
                  <input
                    onChange={this.onChange}
                    name="email"
                    id="emailInput"
                    className="form-control"
                    type="email"
                    placeholder="you@your-domain.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="passwordInput">Password</label>
                  <input
                    onChange={this.onChange}
                    name="password"
                    id="passwordInput"
                    className="form-control"
                    type="password"
                    placeholder="Shhh! Keep this secret."
                  />
                </div>

                <button onClick={this.onSave} type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
              </form>

              <hr />

              {/* Disable for Prelaunch */}
              <div className="row">
                {false && (
                  <p className="text-center">
                    Need an account?{' '}
                    <Link className="link" to="/signup">
                      Signup
                    </Link>
                  </p>
                )}
                <p className="text-center">
                  Forgot your password?{' '}
                  <a className="link" href="mailto:hello@pensieve.space">
                    Send us a message
                  </a>
                </p>
                <p className="text-center">
                  Or go{' '}
                  <Link className="link" to="/">
                    home
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageTemplate>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(sessionActions, dispatch)
});

const mapStateToProps = state => ({
  authenticated: state.app.authenticated
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
