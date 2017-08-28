import React from 'react';
import { connect } from 'react-redux';

import PageTemplate from '../templates/PageTemplate';
import HomeContainer from '../home/HomeContainer';

class HomePage extends React.Component {
  render() {
    return (
      <PageTemplate>
        <HomeContainer />
      </PageTemplate>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.app.authenticated
});

export default connect(mapStateToProps)(HomePage);
