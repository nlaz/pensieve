import React from 'react';

export default function EmptyView() {
  return (
    <div className="EmptyView text-center ml-auto mr-auto mt-5 mb-5">
      <div className="text-center">
        <span className="EmptyView__icon">✌️</span>
        <h2 className="EmptyView__title">No decks in your collection yet</h2>
        <p className="text-secondary">
          Decks are groups of related items for organizing your notes. Haven’t created an deck yet?
          No problem. You can click 'Create Deck +' to get started.
        </p>
      </div>
    </div>
  );
}
