import React from 'react';
import moment from 'moment';
import pluralize from 'pluralize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as deckActions from '../deckActions';
import * as itemActions from '../../items/itemActions';

import Button from '../../../components/button';
import Footer from '../../../components/footer';
import PageTemplate from '../../../components/pages/PageTemplate';
import Popover from '../../../components/popover';

import AddItemModal from '../modals/AddItemModal';
import DeleteDeckModal from '../modals/DeleteDeckModal';
import EditDeckModal from '../modals/EditDeckModal';
import ResetDeckModal from '../modals/ResetDeckModal';

import DeckListItem from './DeckListItem';

const MODAL_TYPES = {
  ADD_ITEM: 'addItem',
  DELETE_DECK: 'deleteDeck',
  EDIT_DECK: 'editDeck',
  RESET_DECK: 'resetDeck',
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
      this.props.router.push('/decks');
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
      deck_id: deckId,
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

    return (
      <PageTemplate className="DeckHomeContainer deck-page" footer={<Footer />}>
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
        <div className="container mt-3 margin-bottom">
          <div className="row margin-top">
            <div className="deckHeader col-md-10 offset-md-1">
              <h5 className="deckSubtitle">DECK</h5>
              <h1 className="deckTitle">{deck.title}</h1>
              <p className="deckDescription">{deck.description}</p>
              <span className="deckDetails">
                {moment(deck.createdAt).format('MMMM D, YYYY')} &middot;{' '}
                {pluralize('item', items.length, true)}
              </span>
              <div className="deckActions">
                <Button onClick={this.onStudyDeck} primary>
                  Study Now
                </Button>
                <Button
                  className="btn-outline-secondary"
                  onClick={() => this.onShowModal(MODAL_TYPES.ADD_ITEM)}
                >
                  Add Item +
                </Button>
              </div>
              <Popover
                align="right"
                ref={c => (this.overflow = c)}
                className="deckActions--overflow"
                trigger={
                  <span className="glyphicon glyphicon-option-vertical" aria-hidden="true" />
                }
              >
                <div className="popoverActions">
                  <div onClick={() => this.onShowModal(MODAL_TYPES.EDIT_DECK)} className="action">
                    Edit Deck
                  </div>
                  <div
                    onClick={() => this.onShowModal(MODAL_TYPES.RESET_DECK)}
                    className="action border-top"
                  >
                    Reset Deck
                  </div>
                  <div onClick={() => this.onShowModal(MODAL_TYPES.DELETE_DECK)} className="action">
                    Delete Deck
                  </div>
                </div>
              </Popover>
              <hr />
            </div>
            <div className="col-md-10 offset-md-1">
              <div className="deckHome-items">
                {items.length > 0 &&
                  items.map((item, key) => (
                    <DeckListItem key={key} item={item} actions={this.props.actions} />
                  ))}
              </div>
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
