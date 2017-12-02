import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { NO_ITEMS_ERROR } from '../../../../server/controllers/errors';
import { SESSION_TYPES } from '../../../../server/controllers/constants';

import * as reviewActions from '../reviewActions';

import PageTemplate from '../../../components/pages/PageTemplate';

class ReviewNewContainer extends React.Component {
  componentWillMount() {
    const sessionType = parseInt(this.props.params.sessionType, 10) || SESSION_TYPES.STUDY;
    const { deckId } = this.props.location.query;
    this.props.actions.createSession({ sessionType, deckId });
  }

  componentDidUpdate() {
    if (this.props.error === NO_ITEMS_ERROR) {
      this.props.router.push(`/`);
    }
  }

  render() {
    return (
      <PageTemplate>
        <div className="col-md-8 offset-md-2 text-center">
          <h3>Creating your study session...</h3>
        </div>
      </PageTemplate>
    );
  }
}

const mapStateToProps = state => ({
  error: state.errors.value,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(reviewActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewNewContainer);
