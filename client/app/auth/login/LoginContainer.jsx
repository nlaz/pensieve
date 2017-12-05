import React from "react";
import { Link } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as sessionActions from "../authActions";

import Button from "../../../components/button";
import Footer from "../../../components/footer";
import PageTemplate from "../../../components/pages/PageTemplate";

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { email: "", password: "" };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentWillMount() {
    if (this.props.authenticated) {
      this.props.router.push("/");
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.authenticated) {
      nextProps.router.push("/");
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
      <PageTemplate className="LoginContainer pt-5 pb-5" footer={<Footer anchor />}>
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-8 offset-sm-2 col-md-6 offset-md-3">
              <h1 className="h4 mb-3 text-center">Login to your account</h1>
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

                <Button onClick={this.onSave} type="submit" primary block>
                  Login
                </Button>
              </form>

              <hr />

              <p className="text-center mb-1">
                Forgot your password? <a href="mailto:hello@pensieve.space">Send us a message</a>
              </p>
              <p className="text-center mb-3">
                Need an account? <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </PageTemplate>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(sessionActions, dispatch),
});

const mapStateToProps = state => ({
  authenticated: state.app.authenticated,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
