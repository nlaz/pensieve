import React from 'react';

export default function EditItemCard({ item, onInputChange, onRemove }) {
  return (
    <div className="col-xs-4 itemCard--wrapper">
      <div className="itemCard">
        <button onClick={onRemove} className="itemCard--close btn btn-default btn-xs">
          <span className="glyphicon glyphicon-remove" aria-hidden="true" />
        </button>
        <div className="form-group">
          <label htmlFor="title">Item title</label>
          <input
            onChange={onInputChange}
            value={item.title}
            name="title"
            className="form-control"
            type="text"
            placeholder="Give me a name..."
          />
        </div>
        <div className="form-group" style={{ flexGrow: '1' }}>
          <label htmlFor="description">Item description</label>
          <textarea
            onChange={onInputChange}
            value={item.description}
            name="description"
            className="form-control"
            type="textarea"
            placeholder="Add some details..."
          />
        </div>
      </div>
    </div>
  );
}
