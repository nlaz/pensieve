import { combineReducers } from 'redux';
import authReducer from './authReducer';
import reviewReducer from './reviewReducer';

const appReducer = combineReducers({
	app: authReducer,
	data: reviewReducer,
});

export default appReducer;
