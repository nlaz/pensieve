import React from "react";

import Button from "../../../components/button";
import Modal from "../../../components/modal";

export default class EditItemModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { front: props.item.front, back: props.item.back };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(e) {
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }));
  }

  render() {
    const { onDismiss, onSave } = this.props;
    const { front, back } = this.state;

    return (
      <Modal title="Edit Item" onDismiss={onDismiss}>
        <form className="form-editDeck">
          <div className="form-group">
            <label htmlFor="front">Front</label>
            <textarea
              name="front"
              className="form-control"
              type="text"
              value={front}
              placeholder="Add to the card front..."
              onChange={this.onInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="back">Back</label>
            <textarea
              name="back"
              className="form-control"
              type="text"
              value={back}
              placeholder="Add to the card back..."
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
