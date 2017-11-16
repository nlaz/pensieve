import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as reviewActions from '../reviewActions';
import PageTemplate from '../../../components/PageTemplate';
import { NO_ITEMS_ERROR } from '../../../../server/controllers/errors';
import { SESSION_TYPES } from '../../../../server/controllers/constants';

class ReviewNewContainer extends React.Component {
  componentWillMount() {
    const sessionType = parseInt(this.props.params.sessionType, 10) || SESSION_TYPES.STUDY;
    this.props.actions.createSession({ sessionType });
  }

  componentDidUpdate() {
    if (this.props.error === NO_ITEMS_ERROR) {
      this.props.router.push(`/`);
    }
  }

  render() {
    return (
      <PageTemplate>
        <div className="col-md-8 col-md-offset-2 text-center margin-top">
          <h3>Creating your study session...</h3>
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
