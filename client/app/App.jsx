import React from "react";
import cookie from "react-cookie";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";

import { logPageView } from "./analytics";
import configureStore from "./configureStore";
import routes from "../routes";

import "../assets/sass/main.scss";

const token = cookie.load("token");

const store = configureStore();

if (token) {
  store.dispatch({
    type: "AUTH_USER_SUCCESS",
    payload: { user: cookie.load("user") },
  });
}

if (process.env.NODE_ENV == "development" && module.hot) {
  module.hot.accept("./appReducer", () => {
    store.replaceReducer(require("./appReducer").default);
  });
}

const App = () => (
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} onUpdate={logPageView} />
  </Provider>
);

export default App;
