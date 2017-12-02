import React from 'react';
import Modal from '../../../components/modal/Modal';

export default function DeleteDeckModal({ onDismiss, onDelete }) {
  return (
    <Modal title="Delete Deck" onDismiss={onDismiss} narrow>
      <p>
        <span style={{ fontWeight: 'bold' }}>
          Deleting a deck will delete all of its cards. This action is irreversible.
        </span>
        {'  '}
        Are you certain you want to delete them?
      </p>
      <div className="modalActions">
        <button type="button" onClick={onDismiss} className="button btn-default">
          Close
        </button>
        <button type="button" onClick={onDelete} className="button btn-danger">
          Delete
        </button>
      </div>
    </Modal>
  );
}
