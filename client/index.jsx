import React from "react";
import { render } from "react-dom";
import App from "./app/App";

render(<App />, document.getElementById("root"));

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./app/App", () => {
    render(<App />, document.getElementById("root"));
  });
}
