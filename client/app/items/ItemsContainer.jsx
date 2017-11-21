import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as itemActions from './itemActions';
import PageTemplate from '../../components/PageTemplate';
import Footer from '../../components/Footer';

import ListItem from './ListItem';
import PageNavigation from '../../components/PageNavigation';

export const PAGE_SIZE = 36;

export const PageHeader = ({ count, onSearchChange }) => {
  return (
    <div className="col-md-10 col-md-offset-1">
      <div className="page-header">
        <div className="info">
          <h4 className="title">Items</h4>
          <p className="subtitle">{count} items in your collection</p>
        </div>
        <div className="actions">
          {count > 0 && (
            <div className="search">
              <span className="glyphicon glyphicon-search" aria-hidden="true" />
              <input
                onChange={onSearchChange}
                type="text"
                id="search"
                className="form-control"
                placeholder="Search for items..."
              />
            </div>
          )}
          <div className="create">
            <Link to="/items/new" className="btn-newItem btn pull-right">
              Create Item +
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

class ItemsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { activePage: 0, filter: '' };
    this.onIncrementPage = this.onIncrementPage.bind(this);
    this.onDecrementPage = this.onDecrementPage.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  componentWillMount() {
    this.props.actions.fetchItems();
  }

  onIncrementPage() {
    const { items } = this.props;
    const numPages = Math.ceil(items.length / PAGE_SIZE);
    const newValue = Math.min(this.state.activePage + 1, numPages - 1);
    this.setState({ activePage: newValue });
  }

  onDecrementPage() {
    const newValue = Math.max(this.state.activePage - 1, 0);
    this.setState({ activePage: newValue });
  }

  onChangePage(index) {
    this.setState({ activePage: index });
  }

  onSearchChange(e) {
    const value = e.target.value;
    this.setState({ filter: value });
  }

  render() {
    const { items = [] } = this.props;
    const { activePage, filter } = this.state;

    const filteredItems =
      filter.length > 0
        ? items.filter(item => item.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
        : items;
    const numPages = Math.ceil(filteredItems.length / PAGE_SIZE);
    const pageStart = activePage * PAGE_SIZE;
    const pageEnd = Math.min((activePage + 1) * PAGE_SIZE, filteredItems.length);
    const pageItems = filteredItems.slice(pageStart, pageEnd);

    return (
      <PageTemplate footer={<Footer />}>
        <div className="items-page container margin-top">
          <div className="row">
            <PageHeader count={items.length} onSearchChange={this.onSearchChange} />
          </div>
          {pageItems.length > 0 ? (
            <div className="row">
              <div className="col-xs-12 col-md-10 col-md-offset-1">
                <div className="itemList">
                  {pageItems.map((item, key) => (
                    <ListItem key={key} item={item} actions={this.props.actions} />
                  ))}
                </div>
              </div>
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
          {numPages > 1 && (
            <PageNavigation
              numPages={numPages}
              onIncrementPage={this.onIncrementPage}
              onDecrementPage={this.onDecrementPage}
              onChangePage={this.onChangePage}
            />
          )}
        </div>
      </PageTemplate>
    );
  }
}

const mapStateToProps = state => ({
  items: state.data.items
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(itemActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsContainer);
