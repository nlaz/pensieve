import React from "react";

import Button from "../button";

export const FlashMessage = ({ message, onDismiss }) => {
  return (
    <div className="flash-message">
      <div className="alert alert-danger alert-dismissable rounded-0" role="alert">
        <div className="container">
          <Button
            className="close"
            onClick={onDismiss}
            data-dismiss="alert"
            aria-label="Close"
            reset
          >
            <span aria-hidden="true">&times;</span>
          </Button>
          <span>
            <strong>Oops!</strong> {message}
          </span>
        </div>
      </div>
    </div>
  );
};
