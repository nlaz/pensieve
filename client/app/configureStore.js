import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import appReducer from "./appReducer";

const configureStore = () => {
  const middlewares = [thunk];

  const preloadedState = window.INITIAL_STATE;
  delete window.INITIAL_STATE;

  return createStore(
    appReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );
};

export default configureStore;
