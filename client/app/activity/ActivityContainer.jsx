import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as homeActions from './activityActions';
import * as itemActions from '../items/itemActions';
import PageTemplate from '../../components/PageTemplate';
import ActivityGraph from './ActivityGraph';
import ItemCard from '../items/ItemCard';
import DeckCard from '../decks/DeckCard';

export const PageHeader = ({ count }) => {
  return (
    <div className="page-header">
      <div className="info">
        <h4 className="title">Needs review</h4>
        <p className="subtitle">{count} items in your collection need review</p>
      </div>
      <div className="actions">
        {count > 0 ? (
          <Link to="items" className="link-seeAll">
            See all
          </Link>
        ) : (
          <div className="create">
            <Link to="items/new" className="btn-newDeck btn btn-primary">
              Create item +
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

class ActivityContainer extends React.Component {
  componentWillMount() {
    this.props.homeActions.fetchActivity();
  }

  render() {
    const { reviewItems = [], popularDecks = [], dueItems = [] } = this.props;
    return (
      <PageTemplate>
        <div className="sessions-page container margin-top">
          <PageHeader count={dueItems.length} />
          {dueItems.length > 0 ? (
            <div className="row">
              {dueItems
                .slice(0, 6)
                .map((item, key) => (
                  <ItemCard className="col-lg-2 col-xs-3" item={item} key={key} />
                ))}
            </div>
          ) : (
            <div className="emptyView-wrapper">
              <div className="text-center emptyView">
                <span style={{ fontSize: '60px' }}>👋</span>
                <h2 className="title">No items in your collection yet</h2>
                <p className="description">
                  Items are important notes that you want to remember. Haven’t created an item yet?
                  No problem. Click ‘Create Item’ to build your first item now.
                </p>
              </div>
            </div>
          )}
          {popularDecks.length > 0 && (
            <div className="row">
              <h2 className="sectionTitle">Your favorite decks</h2>
              {popularDecks
                .slice(0, 3)
                .map((deck, key) => <DeckCard className="col-xs-4" deck={deck} key={key} />)}
            </div>
          )}
          <div className="page-header">
            <h4 className="title">Activity</h4>
          </div>
          <div className="row">
            <div className="col-xs-12">
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
