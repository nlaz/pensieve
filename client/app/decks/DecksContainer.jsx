import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as deckActions from './deckActions';

import Footer from '../../components/footer';
import PageTemplate from '../../components/pages/PageTemplate';

import DeckCard from './DeckCard';
import DeckPageNavigation from './DeckPageNavigation';

export const PAGE_SIZE = 16;

function EmptyDeckView() {
  return (
    <div className="emptyView-wrapper">
      <div className="text-center emptyView">
        <span style={{ fontSize: '60px' }}>✌️</span>
        <h2 className="title">No decks in your collection yet</h2>
        <p className="description">
          Decks are groups of related items for organizing your notes. Haven’t created an deck yet?
          No problem. You can click 'Create Deck +' to get started.
        </p>
      </div>
    </div>
  );
}

class DecksContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { activePage: 0, filter: '' };
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onIncrementPage = this.onIncrementPage.bind(this);
    this.onDecrementPage = this.onDecrementPage.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
  }

  componentWillMount() {
    this.props.actions.fetchDecks();
  }

  onIncrementPage() {
    const { items } = this.props;
    const numPages = Math.ceil(items.length / PAGE_SIZE);
    const newValue = Math.min(this.state.activePage + 1, numPages - 1);
    this.setState({ activePage: newValue });
  }

  onDecrementPage() {
    const newValue = Math.max(this.state.activePage - 1, 0);
    this.setState({ activePage: newValue });
  }

  onChangePage(index) {
    this.setState({ activePage: index });
  }

  onSearchChange(e) {
    const value = e.target.value;
    this.setState({ filter: value });
  }

  render() {
    const { decks = [] } = this.props;
    const { filter, activePage } = this.state;

    const filteredDecks =
      filter.length > 0 ? decks.filter(deck => deck.title.indexOf(filter) !== -1) : decks;
    const numPages = Math.ceil(filteredDecks.length / PAGE_SIZE);
    const pageStart = activePage * PAGE_SIZE;
    const pageEnd = Math.min((activePage + 1) * PAGE_SIZE, filteredDecks.length);
    const pageDecks = filteredDecks.slice(pageStart, pageEnd);

    return (
      <PageTemplate className="DecksContainer decks-page mt-5" footer={<Footer />}>
        <div className="container mt-3">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className="DecksContainer__header">
                <div>
                  <h1 className="h5 m-0">Decks</h1>
                  <p className="text-secondary m-0">{decks.length} decks in your collection</p>
                </div>
                <div className="DecksContainer__actions">
                  {decks.length > 0 && (
                    <input
                      onChange={this.onSearchChange}
                      type="text"
                      className="DecksContainer__search form-control"
                      placeholder="Search for decks..."
                    />
                  )}
                  <Link to="decks/new" className="btn btn-primary">
                    Create Deck +
                  </Link>
                </div>
              </div>
              <hr className="mt-2 mb-2" />
              {pageDecks.length > 0 ? (
                <div className="row">
                  {pageDecks.map((deck, key) => (
                    <DeckCard className="col-xs-6 col-sm-4 col-md-3" deck={deck} key={key} />
                  ))}
                </div>
              ) : (
                <EmptyDeckView />
              )}
              {numPages > 1 && (
                <DeckPageNavigation
                  numPages={numPages}
                  onIncrementPage={this.onIncrementPage}
                  onDecrementPage={this.onDecrementPage}
                  onChangePage={this.onChangePage}
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
  decks: state.data.decks,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(deckActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DecksContainer);
