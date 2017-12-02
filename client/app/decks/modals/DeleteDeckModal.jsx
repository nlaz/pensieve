import React from 'react';

import Button from '../../../components/button';
import Modal from '../../../components/modal';

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
        <Button onClick={onDismiss}>Close</Button>
        <Button onClick={onDelete} danger>
          Delete
        </Button>
      </div>
    </Modal>
  );
}
