import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as deckActions from './deckActions';
import PageTemplate from '../../components/PageTemplate';
import PageNavigation from '../../components/PageNavigation';

import DeckCard from './DeckCard';

export const PAGE_SIZE = 16;

export const PageHeader = ({ count, onSearchChange }) => {
  return (
    <div className="page-header">
      <div className="info">
        <h4 className="title">Decks</h4>
        <p className="subtitle">{count} decks in your collection</p>
      </div>
      <div className="actions">
        {count > 0 && (
          <div className="search">
            <input
              onChange={onSearchChange}
              type="text"
              id="search"
              className="form-control"
              placeholder="Search for decks..."
            />
          </div>
        )}
        <div className="create">
          <Link to="decks/new" className="btn-newDeck btn btn-primary">
            Create Deck +
          </Link>
        </div>
      </div>
    </div>
  );
};

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
    const { filter, activePage } = this.state;
    const { decks = [] } = this.props;

    const filteredDecks =
      filter.length > 0 ? decks.filter(deck => deck.title.indexOf(filter) !== -1) : decks;
    const numPages = Math.ceil(filteredDecks.length / PAGE_SIZE);
    const pageStart = activePage * PAGE_SIZE;
    const pageEnd = Math.min((activePage + 1) * PAGE_SIZE, filteredDecks.length);
    const pageDecks = filteredDecks.slice(pageStart, pageEnd);

    return (
      <PageTemplate>
        <div className="decks-page container margin-top">
          <PageHeader count={decks.length} onSearchChange={this.onSearchChange} />
          {pageDecks.length > 0 ? (
            <div className="row">
              {pageDecks.map((deck, key) => (
                <DeckCard className="col-xs-6 col-sm-4 col-md-3 col-lg-2" deck={deck} key={key} />
              ))}
            </div>
          ) : (
            <div className="emptyView-wrapper">
              <div className="text-center emptyView">
                <span style={{ fontSize: '60px' }}>✌️</span>
                <h2 className="title">No decks in your collection yet</h2>
                <p className="description">
                  Decks are groups of related items for organizing your notes. Haven’t created an
                  deck yet? No problem. You can click ‘Create Deck’ to build your first deck.
                </p>
              </div>
            </div>
          )}
          {numPages > 1 && (
            <PageNavigation
              numPages={numPages}
              onIncrementPage={this.onIncrementPage}
              onDecrementPage={this.onDecrementPage}
              onChangePage={this.onChangePage}
            />
          )}
        </div>
      </PageTemplate>
    );
  }
}

const mapStateToProps = state => ({
  decks: state.data.decks
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(deckActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DecksContainer);
