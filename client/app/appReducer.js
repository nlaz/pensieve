import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import reviewReducer from './review/reviewReducer';
import prelaunchReducer from './landing/prelaunchReducer';

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

const appReducer = combineReducers({
  app: authReducer,
  errors: errorReducer,
  data: reviewReducer,
  prelaunch: prelaunchReducer
});

export default appReducer;
