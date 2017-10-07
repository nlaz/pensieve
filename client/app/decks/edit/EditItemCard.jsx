import React from 'react';

export default function EditItemCard({ item, onInputChange, onRemove }) {
  return (
    <div className="col-xs-6 itemCard--wrapper">
      <div className="itemCard itemCard-edit">
        <button onClick={onRemove} className="itemCard--close btn btn-default btn-xs">
          <span className="glyphicon glyphicon-remove" aria-hidden="true" />
        </button>
        <div className="form-group">
          <input
            onChange={onInputChange}
            value={item.title}
            name="title"
            className="form-control"
            type="text"
            placeholder="Add an item title..."
          />
        </div>
        <div className="form-group" style={{ flexGrow: '1' }}>
          <textarea
            onChange={onInputChange}
            value={item.description}
            name="description"
            className="form-control"
            type="textarea"
            placeholder="Add an item description..."
          />
        </div>
      </div>
    </div>
  );
}
