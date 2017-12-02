import React from 'react';

import Button from '../../../components/button';
import Modal from '../../../components/modal';

export default class AddItemModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { title: '', description: '' };
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
      <Modal title="Add Item" onDismiss={onDismiss}>
        <form className="form-editItem">
          <div className="form-group">
            <label htmlFor="title">Front</label>
            <textarea
              name="title"
              className="form-control"
              type="text"
              value={title}
              placeholder="Add a item title..."
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
              placeholder="Add a item description..."
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
