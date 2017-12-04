import React from 'react';

import Button from '../../../components/button';
import Modal from '../../../components/modal';

export default function DeleteItemModal({ onDismiss, onDelete }) {
  return (
    <Modal title="Delete Item" onDismiss={onDismiss} narrow>
      <p>
        <strong>Deleting a item will remove it permanently. This action is irreversible.</strong>
        {'  '}
        Are you certain you want to delete it?
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
