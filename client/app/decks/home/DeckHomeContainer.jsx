import React from 'react';
import moment from 'moment';
import pluralize from 'pluralize';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../../../components/Header';
import Popover from '../../../components/Popover';
import DeleteDeckModal from './modals/DeleteDeckModal';
import ResetDeckModal from './modals/ResetDeckModal';
import EditDeckModal from './modals/EditDeckModal';
import DeckListItem from './DeckListItem';
import * as deckActions from '../deckActions';
import * as itemActions from '../../items/itemActions';

const MODAL_TYPES = {
  DELETE_DECK: 'deleteDeck',
  EDIT_DECK: 'editDeck',
  RESET_DECK: 'resetDeck'
};

class DeckHomeContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showModalType: undefined };
    this.onDeleteDeck = this.onDeleteDeck.bind(this);
    this.onHideItemClick = this.onHideItemClick.bind(this);
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

  onEditDeck(data) {
    const deckId = this.props.deck._id;
    this.props.actions.editDeck({ deckId, ...data });
    this.setState(() => ({ showModalType: undefined }));
  }

  onDeleteDeck() {
    const deckId = this.props.deck._id;
    this.props.actions.deleteDeck(deckId);
  }

  onHideItemClick(e, item) {
    e.preventDefault();
    e.stopPropagation();
    this.props.actions.toggleHideItem(item);
  }

  render() {
    const { showModalType } = this.state;
    const { deck = {} } = this.props;
    const { items = [] } = deck;

    return (
      <Header className="DeckHomeContainer deck-page">
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
          <ResetDeckModal onDismiss={this.onDismissModal} />
        )}
        <div className="container margin-top margin-bottom">
          <div className="row margin-top">
            <div className="deckHeader col-xs-12">
              <h5 className="deckSubtitle">DECK</h5>
              <h1 className="deckTitle">{deck.title}</h1>
              <p className="deckDescription">{deck.description}</p>
              <span className="deckDetails">
                {moment(deck.createdAt).format('MMMM D, YYYY')} &middot;{' '}
                {pluralize('card', items.length, true)}
              </span>
              <div className="deckActions">
                <button className="button button--primary">Study Now</button>
                <button className="button button--default">Add Item</button>
              </div>
              <Popover
                ref={c => (this.overflow = c)}
                align="right"
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
            <div className="col-xs-12">
              <div className="deckHome-items">
                {items.length > 0 &&
                  items.map((item, key) => (
                    <DeckListItem item={item} onHideItemClick={this.onHideItemClick} key={key} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Header>
    );
  }
}

const mapStateToProps = state => ({
  deck: state.data.deck
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...deckActions, ...itemActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckHomeContainer);
