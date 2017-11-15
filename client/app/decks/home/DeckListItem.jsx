import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router';

import Popover from '../../../components/Popover';
import DeleteItemModal from './modals/DeleteItemModal';
import ResetItemModal from './modals/ResetItemModal';

const MODAL_TYPES = {
  RESET_ITEM: 'resetItem',
  DELETE_ITEM: 'deleteItem'
};

export default class DeckListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showModalType: undefined };
    this.onShowModal = this.onShowModal.bind(this);
    this.onDismissModal = this.onDismissModal.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onHide = this.onHide.bind(this);
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

  onHide(e) {
    e.preventDefault();
    const { item } = this.props;
    this.props.actions.toggleHideItem(item);
  }

  render() {
    const { item } = this.props;
    const { showModalType } = this.state;
    const classNames = cx('deckHome-item', {
      'deckHome-item--hidden': item.hidden
    });

    return (
      <div className="deckHome-itemWrapper">
        {showModalType === MODAL_TYPES.RESET_ITEM && (
          <ResetItemModal onDismiss={this.onDismissModal} />
        )}
        {showModalType === MODAL_TYPES.DELETE_ITEM && (
          <DeleteItemModal onDelete={this.onDelete} onDismiss={this.onDismissModal} />
        )}
        <Link className={classNames} to={`/items/${item._id}`}>
          <span className="title">{item.title}</span>
          <div className="itemActions">
            <Popover
              align="right"
              ref={c => (this.overflow = c)}
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
                <div className="action">Remove from Deck</div>
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
