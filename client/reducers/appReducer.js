import { combineReducers } from 'redux';
import authReducer from './authReducer';
import reviewReducer from './reviewReducer';
import prelaunchReducer from './prelaunchReducer';

const appReducer = combineReducers({
	app: authReducer,
	data: reviewReducer,
	prelaunch: prelaunchReducer,
});

export default appReducer;
