import React from 'react';
import Modal from '../../../components/modal';

export default function ResetItemModal({ onReset, onDismiss }) {
  return (
    <Modal title="Reset Item" onDismiss={onDismiss} narrow>
      <p>
        <span style={{ fontWeight: 'bold' }}>
          Resetting a item will remove your study progress with it. This action is irreversible.
        </span>
        {'  '}
        Are you sure you want to reset it?
      </p>
      <div className="modalActions">
        <button type="button" onClick={onDismiss} className="button btn-default">
          Close
        </button>
        <button type="button" onClick={onReset} className="button btn-danger">
          Reset
        </button>
      </div>
    </Modal>
  );
}
