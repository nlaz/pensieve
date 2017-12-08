import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import deckReducer from "./decks/home/deckReducer";
import decksReducer from "./decks/decksReducer";
import itemReducer from "./items/home/itemReducer";
import reviewReducer from "./review/reviewReducer";
import studyReducer from "./study/studyReducer";

import { SHOW_ERROR, DISMISS_ERROR, UPDATE_MESSAGE } from "./appActions";

const INITIAL_STATE = { value: "", message: "" };

const errorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_ERROR:
      return { ...state, value: action.payload.error, message: action.payload.message };
    case DISMISS_ERROR:
      return { ...state, value: "", message: "" };
    case UPDATE_MESSAGE:
      return { ...state, value: action.payload.error, message: action.payload.message };
    default:
      return state;
  }
};

const dataReducer = combineReducers({
  decks: decksReducer,
  deck: deckReducer,
  item: itemReducer,
  session: reviewReducer,
  study: studyReducer,
});

const appReducer = combineReducers({
  app: authReducer,
  errors: errorReducer,
  data: dataReducer,
});

export default appReducer;
