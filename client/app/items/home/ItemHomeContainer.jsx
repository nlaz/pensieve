import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as itemActions from '../itemActions';

import Button from '../../../components/button';
import Footer from '../../../components/footer';
import PageTemplate from '../../../components/pages/PageTemplate';
import Popover from '../../../components/popover';

import DeleteItemModal from '../modals/DeleteItemModal';
import EditItemModal from '../modals/EditItemModal';
import ResetItemModal from '../modals/ResetItemModal';

import TimeLeft from './TimeLeft';

const MODAL_TYPES = {
  RESET_ITEM: 'resetItem',
  DELETE_ITEM: 'deleteItem',
  EDIT_ITEM: 'editItem',
};

class ItemContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showAnswer: false, showModalType: undefined };
    this.onItemClick = this.onItemClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onShowModal = this.onShowModal.bind(this);
    this.onResetClick = this.onResetClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onDismissModal = this.onDismissModal.bind(this);
  }

  componentWillMount() {
    const { item } = this.props;
    if (item._id !== this.props.params.itemId) {
      this.props.actions.fetchItem({ itemId: this.props.params.itemId, fields: 'deck' });
    }
  }

  onDismissModal() {
    this.setState(() => ({ showModalType: undefined }));
  }

  onItemClick() {
    this.setState({ showAnswer: !this.state.showAnswer });
  }

  onEditClick() {
    const itemId = this.props.item._id;
    this.props.router.push(`/items/${itemId}/edit`);
  }

  onDeleteClick() {
    const { item } = this.props;
    this.props.actions.deleteItem(item._id);
    this.onDismissModal();
  }

  onResetClick() {
    const { item } = this.props;
    this.props.actions.resetItem(item._id);
    this.onDismissModal();
  }

  onEditItem(data) {
    const itemId = this.props.item._id;
    this.props.actions.editItem({ itemId, ...data });
    this.onDismissModal();
  }

  onShowModal(modalType) {
    this.overflow.toggle();
    this.setState(() => ({ showModalType: modalType }));
  }

  render() {
    const { item } = this.props;
    const { deck } = item;
    const { showAnswer, showModalType } = this.state;

    if (!item || Object.keys(item).length === 0) {
      return (
        <PageTemplate className="ItemHomeContainer pt-5" footer={<Footer anchor />}>
          <div className="col-md-8 offset-md-2 text-center">
            <span style={{ fontSize: '80px', fontWeight: 'bold' }}>😅</span>
            <h3 style={{ marginBottom: '40px' }}>Oops, that item does not seem to exist.</h3>
            <Link to="/" className="btn btn-primary">
              Go Home
            </Link>
          </div>
        </PageTemplate>
      );
    }

    const itemContent = showAnswer ? item.description : item.title;

    return (
      <PageTemplate className="ItemHomeContainer pt-5" footer={<Footer anchor />}>
        {showModalType === MODAL_TYPES.DELETE_ITEM && (
          <DeleteItemModal onDelete={this.onDeleteClick} onDismiss={this.onDismissModal} />
        )}
        {showModalType === MODAL_TYPES.EDIT_ITEM && (
          <EditItemModal
            item={item}
            onSave={data => this.onEditItem(data)}
            onDismiss={this.onDismissModal}
          />
        )}
        {showModalType === MODAL_TYPES.RESET_ITEM && (
          <ResetItemModal onReset={this.onResetClick} onDismiss={this.onDismissModal} />
        )}
        <div className="container mt-3">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              <div className="ItemHomeContainer__header">
                <div>
                  <Link to={`/decks/${deck._id}`}>{deck.title}</Link>
                  <span className="m-2">{'>'}</span>
                  <span className="m-0">Item</span>
                </div>
                <Popover
                  align="right"
                  ref={c => (this.overflow = c)}
                  trigger={
                    <Button reset>
                      <i className="fa fa-ellipsis-v fa-lg" aria-hidden="true" />
                    </Button>
                  }
                >
                  <div className="popover-actions">
                    <div
                      className="action-item"
                      onClick={() => this.onShowModal(MODAL_TYPES.EDIT_ITEM)}
                    >
                      Edit Card
                    </div>
                    {item.nextReviewDate && (
                      <div
                        className="action-item border-top"
                        onClick={() => this.onShowModal(MODAL_TYPES.RESET_ITEM)}
                      >
                        Reset Card
                      </div>
                    )}
                    <div
                      className="action-item"
                      onClick={() => this.onShowModal(MODAL_TYPES.DELETE_ITEM)}
                    >
                      Delete Card
                    </div>
                  </div>
                </Popover>
              </div>
              <hr />
              <div
                className="ItemHomeContainer__panel bg-white border rounded mb-2"
                onClick={this.onItemClick}
              >
                <div className="panel-face font-italic text-secondary">
                  {!showAnswer ? <span>Front</span> : <span>Back</span>}
                </div>
                <TimeLeft date={item.nextReviewDate} />
                <h3 className="text-center" style={{ margin: '0' }}>
                  {itemContent}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </PageTemplate>
    );
  }
}

const mapStateToProps = state => ({
  item: state.data.item,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(itemActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer);
