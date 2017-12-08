import React from "react";
import moment from "moment";

export default function TimeLeft({ date }) {
  if (!date) {
    return (
      <div className="time-left badge badge-info" style={{ padding: "6px" }}>
        <span>new</span>
      </div>
    );
  }

  if (moment(date).isBefore(moment())) {
    return (
      <div className="time-left badge badge-warning" style={{ padding: "6px" }}>
        <span>review due</span>
      </div>
    );
  }

  return (
    <div className="time-left badge badge-secondary" style={{ padding: "6px" }}>
      <span>studying</span>
    </div>
  );
}
