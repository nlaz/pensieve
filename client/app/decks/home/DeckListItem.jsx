import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';

import Popover from '../../../components/popover';

import DeleteItemModal from '../../items/modals/DeleteItemModal';
import ResetItemModal from '../../items/modals/ResetItemModal';

const MODAL_TYPES = {
  RESET_ITEM: 'resetItem',
  DELETE_ITEM: 'deleteItem'
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

export default class DeckListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showModalType: undefined };
    this.onShowModal = this.onShowModal.bind(this);
    this.onDismissModal = this.onDismissModal.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  onShowModal(modalType) {
    this.overflow.toggle();
    this.setState(() => ({ showModalType: modalType }));
  }

  onDismissModal() {
    this.setState(() => ({ showModalType: undefined }));
  }

  onDelete() {
    const { item } = this.props;
    this.props.actions.deleteItem(item._id);
    this.onDismissModal();
  }

  onReset() {
    const { item } = this.props;
    this.props.actions.resetItem(item._id);
    this.onDismissModal();
  }

  render() {
    const { item } = this.props;
    const { showModalType } = this.state;

    return (
      <div className="itemList-itemWrapper">
        {showModalType === MODAL_TYPES.RESET_ITEM && (
          <ResetItemModal onReset={this.onReset} onDismiss={this.onDismissModal} />
        )}
        {showModalType === MODAL_TYPES.DELETE_ITEM && (
          <DeleteItemModal onDelete={this.onDelete} onDismiss={this.onDismissModal} />
        )}
        <Link className="itemList-item" to={`/items/${item._id}`}>
          <span className="title">{item.title}</span>
          <div className="itemActions">
            <TimeLeft date={item.nextReviewDate} />
            <Popover
              align="right"
              ref={c => (this.overflow = c)}
              trigger={
                <div onClick={this.onTogglePopover} className="itemAction-overflow">
                  <img
                    className="icon-overflow"
                    src={require('../../../assets/img/icons/overflow.svg')}
                  />
                </div>
              }
            >
              <div className="popoverActions">
                {item.nextReviewDate && (
                  <div onClick={() => this.onShowModal(MODAL_TYPES.RESET_ITEM)} className="action">
                    Reset Item
                  </div>
                )}
                <div
                  onClick={() => this.onShowModal(MODAL_TYPES.DELETE_ITEM)}
                  className="action border-top"
                >
                  Delete Item
                </div>
              </div>
            </Popover>
          </div>
        </Link>
      </div>
    );
  }
}
