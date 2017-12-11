import React from "react";
import moment from "moment";
import pluralize from "pluralize";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as deckActions from "../deckActions";
import * as itemActions from "../../items/itemActions";

import Button from "../../../components/button";
import Footer from "../../../components/footer";
import PageTemplate from "../../../components/pages/PageTemplate";
import Popover from "../../../components/popover";

import AddItemModal from "../modals/AddItemModal";
import DeleteDeckModal from "../modals/DeleteDeckModal";
import EditDeckModal from "../modals/EditDeckModal";
import ResetDeckModal from "../modals/ResetDeckModal";

import EmptyView from "../EmptyView";
import DeckListItem from "./DeckListItem";

const MODAL_TYPES = {
  ADD_ITEM: "addItem",
  DELETE_DECK: "deleteDeck",
  EDIT_DECK: "editDeck",
  RESET_DECK: "resetDeck",
};

class DeckHomeContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showModalType: undefined };
    this.onAddItem = this.onAddItem.bind(this);
    this.onDeleteDeck = this.onDeleteDeck.bind(this);
    this.onResetDeck = this.onResetDeck.bind(this);
    this.onStudyDeck = this.onStudyDeck.bind(this);
    this.onShowModal = this.onShowModal.bind(this);
    this.onDismissModal = this.onDismissModal.bind(this);
  }

  componentWillMount() {
    const { deck, params } = this.props;
    if (!deck || deck._id !== params.deckId) {
      this.props.actions.fetchDeck(params.deckId);
    }
  }

  componentDidUpdate() {
    if (Object.keys(this.props.deck).length === 0) {
      this.props.router.push("/decks");
    }
  }

  onShowModal(modalType) {
    this.overflow.toggle();
    this.setState(() => ({ showModalType: modalType }));
  }

  onDismissModal() {
    this.setState(() => ({ showModalType: undefined }));
  }

  onAddItem(data) {
    const deckId = this.props.deck._id;
    this.props.actions.createItem({
      deck: deckId,
      title: data.title,
      description: data.description,
    });
    this.onDismissModal();
  }

  onEditDeck(data) {
    const deckId = this.props.deck._id;
    this.props.actions.editDeck({ deckId, ...data });
    this.onDismissModal();
  }

  onDeleteDeck() {
    const deckId = this.props.deck._id;
    this.props.actions.deleteDeck(deckId);
    this.onDismissModal();
  }

  onResetDeck() {
    const deckId = this.props.deck._id;
    this.props.actions.resetDeck(deckId);
    this.onDismissModal();
  }

  onStudyDeck() {
    const deckId = this.props.deck._id;
    this.props.router.push(`/sessions/new?deckId=${deckId}`);
  }

  render() {
    const { showModalType } = this.state;
    const { deck = {} } = this.props;
    const { items = [] } = deck;

    const numNewCards = items.filter(item => !item.nextReviewDate).length;
    const numDueCards = items.filter(item => moment(item.nextReviewDate).isBefore(moment())).length;
    const numInProgress = items.length - numNewCards - numDueCards;

    return (
      <PageTemplate className="deck-home pt-5 pb-5" footer={<Footer anchor />}>
        {showModalType === MODAL_TYPES.ADD_ITEM && (
          <AddItemModal onSave={data => this.onAddItem(data)} onDismiss={this.onDismissModal} />
        )}
        {showModalType === MODAL_TYPES.DELETE_DECK && (
          <DeleteDeckModal onDismiss={this.onDismissModal} onDelete={this.onDeleteDeck} />
        )}
        {showModalType === MODAL_TYPES.EDIT_DECK && (
          <EditDeckModal
            deck={deck}
            onSave={data => this.onEditDeck(data)}
            onDismiss={this.onDismissModal}
          />
        )}
        {showModalType === MODAL_TYPES.RESET_DECK && (
          <ResetDeckModal onReset={this.onResetDeck} onDismiss={this.onDismissModal} />
        )}
        <div className="container mt-3">
          <div className="row">
            <div className="position-relative col-lg-10 offset-lg-1">
              <h6 className="text-secondary text-uppercase m-0">DECK</h6>
              <h1 className="font-weight-bold h3 mb-0">{deck.title}</h1>
              {deck.description && <p className="text-dark h5 mb-1">{deck.description}</p>}
              <div className="mt-1 mb-3">
                <small className="text-secondary">
                  {moment(deck.createdAt).format("MMMM D, YYYY")} &middot;{" "}
                  {pluralize("card", items.length, true)}
                </small>
              </div>
              <div className="my-3">
                <Button onClick={this.onStudyDeck} primary disabled={items.length === 0}>
                  Study now
                </Button>
                <Button
                  className="btn-default ml-2"
                  onClick={() => this.onShowModal(MODAL_TYPES.ADD_ITEM)}
                >
                  Add item +
                </Button>
              </div>
              <Popover
                align="right"
                ref={c => (this.overflow = c)}
                className="deck-home-overflow position-absolute"
                trigger={
                  <Button reset>
                    <i className="fa fa-ellipsis-v fa-lg" aria-hidden="true" />
                  </Button>
                }
              >
                <div className="popover-actions">
                  <div
                    className="action-item"
                    onClick={() => this.onShowModal(MODAL_TYPES.EDIT_DECK)}
                  >
                    Edit Deck
                  </div>
                  <div
                    className="action-item border-top"
                    onClick={() => this.onShowModal(MODAL_TYPES.RESET_DECK)}
                  >
                    Reset Deck
                  </div>
                  <div
                    className="action-item"
                    onClick={() => this.onShowModal(MODAL_TYPES.DELETE_DECK)}
                  >
                    Delete Deck
                  </div>
                </div>
              </Popover>
              <hr />
            </div>
            <div className="col-lg-10 offset-lg-1">
              {items.length > 0 ? (
                <div>
                  {(numDueCards > 0 || numNewCards > 0) && (
                    <div className="mb-2 text-right">
                      {numNewCards > 0 && (
                        <span className="badge badge-info" style={{ padding: "6px" }}>
                          {pluralize("new card", numNewCards, true)}
                        </span>
                      )}
                      {numDueCards > 0 && (
                        <span className="badge badge-warning ml-2" style={{ padding: "6px" }}>
                          {pluralize("due card", numDueCards, true)}
                        </span>
                      )}
                      {numInProgress > 0 && (
                        <span className="badge badge-secondary ml-2" style={{ padding: "6px" }}>
                          {pluralize("later cards", numInProgress, true)}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="border rounded">
                    {items.map((item, key) => (
                      <DeckListItem key={key} item={item} actions={this.props.actions} />
                    ))}
                  </div>
                </div>
              ) : (
                <EmptyView
                  title="Add cards to your deck"
                  description="Decks are made of related notes. Start adding cards to your deck by clicking 'Add Item +'"
                />
              )}
            </div>
          </div>
        </div>
      </PageTemplate>
    );
  }
}

const mapStateToProps = state => ({
  deck: state.data.deck,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...deckActions, ...itemActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckHomeContainer);
