import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as homeActions from './activityActions';
import * as itemActions from '../items/itemActions';
import PageTemplate from '../../components/PageTemplate';
import ActivityGraph from './ActivityGraph';

const PageHead = ({ children }) => {
  return (
    <div className="sessions-page container">
      <div className="col-md-8 col-md-offset-2">
        <h4 className="page-header">Recent Activity</h4>
        {children}
      </div>
    </div>
  );
};

class ActivityContainer extends React.Component {
  componentWillMount() {
    if (!this.props.sessions) {
      this.props.homeActions.fetchActivity();
    }
  }

  render() {
    return (
      <PageTemplate>
        <PageHead>
          <div className="sectionTitle">Activity</div>
          <ActivityGraph reviewItems={this.props.reviewItems} />
        </PageHead>
      </PageTemplate>
    );
  }
}

const mapStateToProps = state => ({
  reviewItems: state.data.reviewItems
});

const mapDispatchToProps = dispatch => ({
  homeActions: bindActionCreators(homeActions, dispatch),
  itemActions: bindActionCreators(itemActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityContainer);
