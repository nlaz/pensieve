import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import deckReducer from "./decks/home/deckReducer";
import decksReducer from "./decks/decksReducer";
import itemReducer from "./items/home/itemReducer";
import reviewReducer from "./review/reviewReducer";
import studyReducer from "./study/studyReducer";

import { SHOW_FLASH, DISMISS_FLASH } from "./appActions";

const INITIAL_STATE = {};

const flashReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_FLASH:
      return { ...state, message: action.message };
    case DISMISS_FLASH:
      return INITIAL_STATE;
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
  flash: flashReducer,
  data: dataReducer,
});

export default appReducer;
