import React from 'react';

import Button from '../../../components/button';
import Modal from '../../../components/modal';

export default function ResetItemModal({ onReset, onDismiss }) {
  return (
    <Modal title="Reset Item" onDismiss={onDismiss} narrow>
      <p>
        <strong>
          Resetting a item will remove your study progress with it. This action is irreversible.
        </strong>
        {'  '}
        Are you sure you want to reset it?
      </p>
      <div className="modalActions">
        <Button onClick={onDismiss}>Close</Button>
        <Button onClick={onReset} danger>
          Reset
        </Button>
      </div>
    </Modal>
  );
}
