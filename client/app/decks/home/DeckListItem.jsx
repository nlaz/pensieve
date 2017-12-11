import React from "react";
import { Link } from "react-router";

import Button from "../../../components/button";
import Popover from "../../../components/popover";

import DeleteItemModal from "../../items/modals/DeleteItemModal";
import ResetItemModal from "../../items/modals/ResetItemModal";

import TimeLeft from "../../items/home/TimeLeft";

const MODAL_TYPES = {
  RESET_ITEM: "resetItem",
  DELETE_ITEM: "deleteItem",
};

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
      <div className="list-item-wrapper bg-white">
        {showModalType === MODAL_TYPES.RESET_ITEM && (
          <ResetItemModal onReset={this.onReset} onDismiss={this.onDismissModal} />
        )}
        {showModalType === MODAL_TYPES.DELETE_ITEM && (
          <DeleteItemModal onDelete={this.onDelete} onDismiss={this.onDismissModal} />
        )}
        <Link className="list-item" to={`/items/${item._id}`}>
          <div className="row">
            <div className="col-9 col-sm-10">
              <div className="d-flex flex-column flex-md-row">
                <span className="col-md-5">{item.front}</span>
                <span className="d-none d-sm-block font-weight-bold col-md-7 mt-2 mt-md-0">
                  {item.back}
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-end align-items-start col-3 col-sm-2">
              <TimeLeft date={item.nextReviewDate} />
              <Popover
                align="right"
                className="text-secondary"
                ref={c => (this.overflow = c)}
                trigger={
                  <Button className="ml-2" reset>
                    <i className="fa fa-ellipsis-h text-secondary" aria-hidden="true" />
                  </Button>
                }
              >
                <div className="popover-actions">
                  {item.nextReviewDate && (
                    <div
                      className="action-item"
                      onClick={() => this.onShowModal(MODAL_TYPES.RESET_ITEM)}
                    >
                      Reset Item
                    </div>
                  )}
                  <div
                    className="action-item border-top"
                    onClick={() => this.onShowModal(MODAL_TYPES.DELETE_ITEM)}
                  >
                    Delete Item
                  </div>
                </div>
              </Popover>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
