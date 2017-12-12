import reduxThunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

import appReducer from "./appReducer";

const configureStore = () => {
  const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

  const preloadedState = window.INITIAL_STATE;
  delete window.INITIAL_STATE;

  return createStoreWithMiddleware(
    appReducer,
    preloadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
};

export default configureStore;
