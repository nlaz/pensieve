import { combineReducers } from 'redux';
import activityReducer from './activity/activityReducer';
import authReducer from './auth/authReducer';
import reviewReducer from './review/reviewReducer';
import prelaunchReducer from './landing/prelaunchReducer';
import itemReducer from './items/home/itemReducer';
import itemsReducer from './items/itemsReducer';
import deckReducer from './decks/home/deckReducer';
import decksReducer from './decks/decksReducer';

import { SHOW_ERROR, DISMISS_ERROR, UPDATE_MESSAGE } from './appActions';

const INITIAL_STATE = { value: '', message: '' };

const errorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_ERROR:
      return { ...state, value: action.payload.error, message: action.payload.message };
    case DISMISS_ERROR:
      return { ...state, value: '', message: '' };
    case UPDATE_MESSAGE:
      return { ...state, value: action.payload.error, message: action.payload.message };
  }
  return state;
};

const dataReducer = combineReducers({
  decks: decksReducer,
  deck: deckReducer,
  items: itemsReducer,
  item: itemReducer,
  session: reviewReducer,
  activity: activityReducer
});

const appReducer = combineReducers({
  app: authReducer,
  errors: errorReducer,
  data: dataReducer,
  prelaunch: prelaunchReducer
});

export default appReducer;
