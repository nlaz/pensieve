import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../Header';
import * as deckActions from '../../actions/deckActions';

const DeckCard = ({ deck }) => (
  <div className='col-xs-6 col-sm-3 deckCard--wrapper'>
    <Link to={`/decks/${deck._id}`} className='deckCard'>
      <span className='deckCard--itemCount'>
        {deck.items.length}
				<span className='glyphicon glyphicon-file' aria-hidden='true' ></span>
      </span>
      <h4>{deck.title}</h4>
    </Link>
  </div>
);

export const PageHeader = ({ count, onSearchChange }) => {
	return (
		<div className='page-header'>
			<div className='info'>
				<h4 className='title'>Decks</h4>
				{count &&
					<p className='subtitle'>{count} decks in your collection</p>
				}
			</div>
			<div className='actions'>
				<div className='search'>
					<input onChange={onSearchChange} type='text' id='search' className='form-control' placeholder='Search for decks...' />
				</div>
				<div className='create'>
          <Link to='decks/new' className='btn-newDeck btn btn-primary'>
            New Deck +
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
  }

  componentWillMount() {
    if(!this.props.decks) {
      this.props.actions.fetchDecks();
    }
  }

  onSearchChange(e) {
		const value = e.target.value;
		this.setState({ filter: value });
	}

  render() {
    const { filter } = this.state;
    const { decks = [] } = this.props;

		const filteredDecks = filter.length > 0 ? decks.filter(deck => deck.title.indexOf(filter) !== -1) : decks;

    return (
      <Header className='decks-page'>
        <div className='container'>
          <div className='row'>
            <PageHeader
              count={decks.length}
              onSearchChange={this.onSearchChange}
            />
           {filteredDecks.length > 0 && filteredDecks.map((deck, key) => (
             <DeckCard deck={deck} key={key} />
           ))}
          </div>
        </div>
      </Header>
    );
  }
}

const mapStateToProps = (state) => ({
  decks: state.data.decks,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(deckActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DecksContainer);
