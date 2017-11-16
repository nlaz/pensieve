import React from 'react';
import Modal from '../../../../components/Modal';

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
        <button type="button" onClick={onDismiss} className="button button--default">
          Close
        </button>
        <button type="button" onClick={onReset} className="button button--alert">
          Reset
        </button>
      </div>
    </Modal>
  );
}
