import React from 'react';
import Modal from '../../../components/Modal';

export default function DeleteItemModal({ onDismiss, onDelete }) {
  return (
    <Modal title="Delete Item" onDismiss={onDismiss} narrow>
      <p>
        <span style={{ fontWeight: 'bold' }}>
          Deleting a item will remove it permanently. This action is irreversible.
        </span>
        {'  '}
        Are you certain you want to delete it?
      </p>
      <div className="modalActions">
        <button type="button" onClick={onDismiss} className="button button--default">
          Close
        </button>
        <button type="button" onClick={onDelete} className="button button--alert">
          Delete
        </button>
      </div>
    </Modal>
  );
}
