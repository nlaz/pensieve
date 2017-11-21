import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Footer from '../../../components/Footer';
import PageTemplate from '../../../components/PageTemplate';
import * as itemActions from '../itemActions';

const panelStyles = {
  minHeight: '400px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  whiteSpace: 'pre-wrap'
};

class ItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onItemClick = this.onItemClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onToggleHideItem = this.onToggleHideItem.bind(this);
    this.state = { showAnswer: false };
  }

  componentWillMount() {
    const { item } = this.props;
    if (item._id !== this.props.params.itemId) {
      this.props.actions.fetchItem(this.props.params.itemId);
    }
  }

  onItemClick() {
    this.setState({ showAnswer: !this.state.showAnswer });
  }

  onEditClick() {
    const itemId = this.props.item._id;
    this.props.router.push(`/items/${itemId}/edit`);
  }

  onToggleHideItem(e, item) {
    e.preventDefault();
    e.stopPropagation();
    this.props.actions.toggleHideItem(item);
  }

  render() {
    const { item } = this.props;
    const { showAnswer } = this.state;

    if (!item) {
      return (
        <Header className="item-page">
          <div className="container">
            <h3>
              <strong>Hmm.</strong> That item does not seem to exist.
            </h3>
          </div>
        </Header>
      );
    }

    const itemContent = showAnswer ? item.description : item.title;
    const editButton = (
      <button
        onClick={this.onEditClick}
        className="btn btn-primary pull-right"
        style={{ marginLeft: '5px' }}
      >
        Edit
      </button>
    );
    const newItemButton = (
      <Link to="/items/new" className="btn btn-primary pull-right">
        New Item
      </Link>
    );

    return (
      <PageTemplate className="item-page" footer={<Footer />}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="page-header">
                <h2>
                  Item {editButton}
                  {newItemButton}
                </h2>
              </div>
              <div className="panel panel-default">
                <div className="panel-body" style={panelStyles} onClick={this.onItemClick}>
                  <h3 className="text-center" style={{ margin: '0' }}>
                    {itemContent}
                  </h3>
                  <button
                    onClick={e => this.onToggleHideItem(e, item)}
                    className="reviewCard--hide btn btn-reset"
                  >
                    {item.hidden ? (
                      <span className="glyphicon glyphicon-eye-close" aria-hidden="true" />
                    ) : (
                      <span className="glyphicon glyphicon-eye-open" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageTemplate>
    );
  }
}

const mapStateToProps = state => ({
  item: state.data.item
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(itemActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer);
