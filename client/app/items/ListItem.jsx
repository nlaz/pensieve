import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router';

import Popover from '../../components/Popover';
import DeleteItemModal from '../decks/home/modals/DeleteItemModal';
import ResetItemModal from '../decks/home/modals/ResetItemModal';

const MODAL_TYPES = {
  RESET_ITEM: 'resetItem',
  DELETE_ITEM: 'deleteItem'
};

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showModalType: undefined };
    this.onShowModal = this.onShowModal.bind(this);
    this.onDismissModal = this.onDismissModal.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onHide = this.onHide.bind(this);
  }

  onShowModal(modalType) {
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

  onHide(e) {
    e.preventDefault();
    const { item } = this.props;
    this.props.actions.toggleHideItem(item);
  }

  render() {
    const { item } = this.props;
    const { showModalType } = this.state;
    const classNames = cx('itemList-item', {
      'itemList-item--hidden': item.hidden
    });

    return (
      <div className="itemList-itemWrapper">
        {showModalType === MODAL_TYPES.RESET_ITEM && (
          <ResetItemModal onReset={this.onReset} onDismiss={this.onDismissModal} />
        )}
        {showModalType === MODAL_TYPES.DELETE_ITEM && (
          <DeleteItemModal onDelete={this.onDelete} onDismiss={this.onDismissModal} />
        )}
        <Link className={classNames} to={`/items/${item._id}`}>
          <span className="title">{item.title}</span>
          <div className="itemActions">
            <Popover
              align="right"
              trigger={
                <div onClick={this.onTogglePopover} className="itemAction-overflow">
                  <span className="glyphicon glyphicon-option-horizontal" aria-hidden="true" />
                </div>
              }
            >
              <div className="popoverActions">
                <div onClick={() => this.onShowModal(MODAL_TYPES.RESET_ITEM)} className="action">
                  Reset Item
                </div>
                <div
                  onClick={() => this.onShowModal(MODAL_TYPES.DELETE_ITEM)}
                  className="action border-top"
                >
                  Delete Item
                </div>
              </div>
            </Popover>
            <div onClick={this.onHide} className="itemAction-hideItem">
              {item.hidden ? (
                <span className="glyphicon glyphicon-eye-close" aria-hidden="true" />
              ) : (
                <span className="glyphicon glyphicon-eye-open" aria-hidden="true" />
              )}
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
