import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as itemActions from '../itemActions';

import Footer from '../../../components/footer';
import PageTemplate from '../../../components/pages/PageTemplate';
import Popover from '../../../components/popover';

import DeleteItemModal from '../modals/DeleteItemModal';
import EditItemModal from '../modals/EditItemModal';
import ResetItemModal from '../modals/ResetItemModal';

const MODAL_TYPES = {
  RESET_ITEM: 'resetItem',
  DELETE_ITEM: 'deleteItem',
  EDIT_ITEM: 'editItem'
};

export function TimeLeft({ date }) {
  if (!date) {
    return false;
  }

  if (moment(date).isBefore(moment())) {
    return (
      <div className="item-timeLeft item-timeLeft--due">
        <span>due</span>
        <img className="icon-alarm" src={require('../../../assets/img/icons/alarm_red.svg')} />
      </div>
    );
  }

  return (
    <div className="item-timeLeft">
      <span>{moment().to(date, true)}</span>
      <img className="icon-alarm" src={require('../../../assets/img/icons/alarm.svg')} />
    </div>
  );
}

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
    const { showAnswer, showModalType } = this.state;

    if (!item || Object.keys(item).length === 0) {
      return (
        <PageTemplate className="item-page" footer={<Footer />}>
          <div className="col-md-8 offset-md-2 text-center margin-top">
            <span style={{ fontSize: '80px', fontWeight: 'bold' }}>😅</span>
            <h3 style={{ marginBottom: '40px' }}>Oops, that item does not seem to exist.</h3>
            <Link to="/" className="button btn-primary">
              Go Home
            </Link>
          </div>
        </PageTemplate>
      );
    }

    const itemContent = showAnswer ? item.description : item.title;

    return (
      <PageTemplate className="item-page margin-top" footer={<Footer />}>
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
        <div className="container margin-top">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              <div className="item-header">
                <h5>ITEM</h5>
                <Popover
                  align="right"
                  ref={c => (this.overflow = c)}
                  className="itemPage-overflow"
                  trigger={
                    <span className="glyphicon glyphicon-option-vertical" aria-hidden="true" />
                  }
                >
                  <div className="popoverActions">
                    <div onClick={() => this.onShowModal(MODAL_TYPES.EDIT_ITEM)} className="action">
                      Edit Card
                    </div>
                    {item.nextReviewDate && (
                      <div
                        onClick={() => this.onShowModal(MODAL_TYPES.RESET_ITEM)}
                        className="action border-top"
                      >
                        Reset Card
                      </div>
                    )}
                    <div
                      onClick={() => this.onShowModal(MODAL_TYPES.DELETE_ITEM)}
                      className="action"
                    >
                      Delete Card
                    </div>
                  </div>
                </Popover>
              </div>
              <hr />
              <div className="panel panel-default">
                <div className="panel-body" onClick={this.onItemClick}>
                  <div className="panel-face">
                    {!showAnswer ? <span>Front</span> : <span>Back</span>}
                  </div>
                  <TimeLeft date={item.nextReviewDate} />
                  <h3 className="text-center" style={{ margin: '0' }}>
                    {itemContent}
                  </h3>
                </div>
              </div>
              <div className="item-info">
                {item.deck && (
                  <p className="item-deckInfo">
                    Part of <span className="item-deckTitle">{item.deck.title}</span>
                  </p>
                )}
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
