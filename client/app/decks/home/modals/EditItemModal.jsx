import React from 'react';
import Modal from '../../../../components/Modal';

export default class EditItemModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { title: props.item.title, description: props.item.description };
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
      <Modal title="Edit Item" onDismiss={onDismiss}>
        <form className="form-editDeck">
          <div className="form-group">
            <label htmlFor="title">Front</label>
            <input
              name="title"
              className="form-control"
              type="text"
              value={title}
              placeholder="Add a card title..."
              onChange={this.onInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Back</label>
            <textarea
              name="description"
              className="form-control"
              type="text"
              value={description}
              placeholder="Add a card description..."
              onChange={this.onInputChange}
            />
          </div>
          <div className="modalActions">
            <button type="button" onClick={onDismiss} className="button button--default">
              Close
            </button>
            <button
              type="button"
              onClick={() => onSave(this.state)}
              className="button button--primary"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    );
  }
}
