import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import reviewReducer from './review/reviewReducer';
import prelaunchReducer from './landing/prelaunchReducer';

import { SHOW_ERROR, DISMISS_ERROR, UPDATE_MESSAGE } from './appActions';

const INITIAL_STATE = { error: '', message: '' };

const errorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_ERROR:
      return { ...state, error: action.payload.error, message: action.payload.message };
    case DISMISS_ERROR:
      return { ...state, error: '', message: '' };
    case UPDATE_MESSAGE:
      return { ...state, error: action.payload.error, message: action.payload.message };
  }
  return state;
};

const appReducer = combineReducers({
  app: combineReducers({ auth: authReducer, errors: errorReducer }),
  data: reviewReducer,
  prelaunch: prelaunchReducer
});

export default appReducer;
