import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as reviewActions from '../reviewActions';
import PageTemplate from '../../../components/PageTemplate';

class ReviewNewContainer extends React.Component {
  componentDidMount() {
    this.props.actions.createSession();
  }

  render() {
    return (
      <PageTemplate>
        <div className="col-md-8 col-md-offset-2 text-center">
          <h3 style={{ marginTop: '50px' }}>Creating your review session...</h3>
        </div>
      </PageTemplate>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(reviewActions, dispatch)
});

export default connect(null, mapDispatchToProps)(ReviewNewContainer);
