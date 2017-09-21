import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as homeActions from './activityActions';
import * as itemActions from '../items/itemActions';
import PageTemplate from '../../components/PageTemplate';
import ActivityGraph from './ActivityGraph';
import ItemCard from '../items/ItemCard';
import DeckCard from '../decks/DeckCard';

class ActivityContainer extends React.Component {
  componentWillMount() {
    this.props.homeActions.fetchActivity();
  }

  render() {
    const { reviewItems = [], popularDecks = [], dueItems = [] } = this.props;
    return (
      <PageTemplate>
        <div className="sessions-page container">
          <div className="col-md-8 col-md-offset-2">
            <div className="row">
              <h2 className="sectionTitle">Catch up</h2>
              {dueItems
                .slice(0, 8)
                .map((item, key) => <ItemCard className="col-xs-3" item={item} key={key} />)}
            </div>
            <div className="row">
              <h2 className="sectionTitle">Your favorite decks</h2>
              {popularDecks
                .slice(0, 3)
                .map((deck, key) => <DeckCard className="col-xs-4" deck={deck} key={key} />)}
            </div>
            <div className="row">
              <h2 className="sectionTitle">Activity</h2>
              <ActivityGraph reviewItems={reviewItems} />
            </div>
          </div>
        </div>
      </PageTemplate>
    );
  }
}

const mapStateToProps = state => ({
  reviewItems: state.data.activity.reviewItems,
  popularDecks: state.data.activity.popularDecks,
  dueItems: state.data.activity.dueItems
});

const mapDispatchToProps = dispatch => ({
  homeActions: bindActionCreators(homeActions, dispatch),
  itemActions: bindActionCreators(itemActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityContainer);
