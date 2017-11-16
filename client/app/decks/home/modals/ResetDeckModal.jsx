import React from 'react';
import Modal from '../../../../components/Modal';

export default function ResetDeckModal({ onDismiss, onReset }) {
  return (
    <Modal title="Reset Deck" onDismiss={onDismiss} narrow>
      <p>
        <span style={{ fontWeight: 'bold' }}>
          Resetting a deck will remove all your progress studying its cards. This action is
          irreversible.
        </span>
        {'  '}
        Are you sure you want to reset them?
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
