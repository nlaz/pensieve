import React from "react";

export default function EmptyView({ title, description, emoji = "✌️" }) {
  return (
    <div className="empty view text-center ml-auto mr-auto mt-5 mb-5">
      <div className="text-center">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <span className="empty-view-icon">{emoji}</span>
            <h2 className="empty-view-title">{title}</h2>
            <p className="text-secondary">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
