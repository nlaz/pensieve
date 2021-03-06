import React from 'react';

import Button from '../../../components/button';
import Modal from '../../../components/modal';

export default class EditDeckModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { title: props.deck.title, description: props.deck.description };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(e) {
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }));
  }

  render() {
    const { onDismiss, onSave } = this.props;
    const { title, description } = this.state;
    return (
      <Modal title="Edit Deck" onDismiss={onDismiss}>
        <form className="form-editDeck">
          <div className="form-group">
            <label htmlFor="title">Deck Title</label>
            <input
              name="title"
              className="form-control"
              type="text"
              value={title}
              placeholder="Add a deck title..."
              onChange={this.onInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Deck Description</label>
            <textarea
              name="description"
              className="form-control"
              type="text"
              value={description}
              placeholder="Add a deck description..."
              onChange={this.onInputChange}
            />
          </div>
          <div className="modalActions">
            <Button onClick={onDismiss}>Close</Button>
            <Button onClick={() => onSave(this.state)} primary>
              Save
            </Button>
          </div>
        </form>
      </Modal>
    );
  }
}
