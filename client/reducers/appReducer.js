import { combineReducers } from 'redux';
import authReducer from './authReducer';
import reviewReducer from './reviewReducer';
import prelaunchReducer from './prelaunchReducer';
import { routerReducer } from 'react-router-redux';

const appReducer = combineReducers({
	routing: routerReducer,
	app: authReducer,
	data: reviewReducer,
	prelaunch: prelaunchReducer,
});

export default appReducer;
