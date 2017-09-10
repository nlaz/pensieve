import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import reviewReducer from './review/reviewReducer';
import prelaunchReducer from './landing/prelaunchReducer';

const appReducer = combineReducers({
  app: authReducer,
  data: reviewReducer,
  prelaunch: prelaunchReducer
});

export default appReducer;
