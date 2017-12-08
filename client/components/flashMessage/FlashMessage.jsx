import React from "react";
import cx from "classnames";

import Button from "../button";

export const FlashMessage = ({ message, error, onDismiss }) => {
  if (!message) return false;

  const classNames = cx(
    "alert alert-dismissable rounded-0",
    { "alert-info": !Boolean(error) },
    { "alert-danger": Boolean(error) },
  );

  const decorator = Boolean(error) ? "Oops!" : "Success!";

  return (
    <div className="flash-message">
      <div className={classNames} role="alert">
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
            <strong>{decorator}</strong> {message}
          </span>
        </div>
      </div>
    </div>
  );
};
