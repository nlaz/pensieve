import React from 'react';
import { connect } from 'react-redux';

const ReqAuth = ComposedComponent => {
  class Authentication extends React.Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.router.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        nextProps.router.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    authenticated: state.app.authenticated
  });

  return connect(mapStateToProps)(Authentication);
};

export default ReqAuth;
