import React from 'react';
import Modal from '../../../components/modal';

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
