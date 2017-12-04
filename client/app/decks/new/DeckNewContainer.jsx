import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as deckActions from '../deckActions';

import Button from '../../../components/button';
import Footer from '../../../components/footer';
import PageTemplate from '../../../components/pages/PageTemplate';

class DeckNewContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { title: '', description: '' };

    this.onCancel = this.onCancel.bind(this);
    this.onCreateDeck = this.onCreateDeck.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentWillMount() {
    if (this.props.deck) {
      this.props.actions.clearDeck();
    }
  }

  componentDidUpdate() {
    if (Object.keys(this.props.deck).length > 0) {
      this.props.router.push(`/decks/` + this.props.deck._id);
    }
  }

  onCancel() {
    this.props.router.push('/decks');
  }

  onCreateDeck() {
    const { title, description } = this.state;
    this.props.actions.createDeck({
      title: title,
      description: description,
    });
  }

  onInputChange(e) {
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }));
  }

  render() {
    const { title, description } = this.state;

    return (
      <PageTemplate className="DeckNewContainer pt-5" footer={<Footer anchor />}>
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-8 offset-sm-2 col-md-6 offset-md-3">
              <h1 className="h4 mb-3 text-center">Create a new study deck</h1>
              <form>
                <div className="form-group">
                  <label htmlFor="title">Deck title</label>
                  <input
                    onChange={this.onInputChange}
                    value={title}
                    name="title"
                    className="form-control"
                    type="text"
                    placeholder="Add a deck title..."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Deck description</label>
                  <textarea
                    onChange={this.onInputChange}
                    value={description}
                    name="description"
                    className="form-control"
                    type="textarea"
                    placeholder="Add a deck description..."
                  />
                </div>
                <div className="mt-4">
                  <Button onClick={this.onCreateDeck} type="submit" primary block>
                    Create Deck
                  </Button>
                  <Button onClick={this.onCancel} block>
                    Cancel
                  </Button>
                </div>
              </form>
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
  actions: bindActionCreators(deckActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckNewContainer);
