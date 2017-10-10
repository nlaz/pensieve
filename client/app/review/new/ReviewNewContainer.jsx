import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as reviewActions from '../reviewActions';
import PageTemplate from '../../../components/PageTemplate';
import { NO_ITEMS_ERROR } from '../../../../server/controllers/errors';

class ReviewNewContainer extends React.Component {
  componentWillMount() {
    this.props.actions.createSession();
  }

  componentDidUpdate() {
    if (this.props.error === NO_ITEMS_ERROR) {
      this.props.router.push(`/`);
    }
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

const mapStateToProps = state => ({
  error: state.errors.value
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(reviewActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewNewContainer);
