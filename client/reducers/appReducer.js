import { combineReducers } from 'redux';
import authReducer from './authReducer';
import itemReducer from './itemReducer';

const appReducer = combineReducers({
	app: authReducer,
	data: itemReducer,
});

export default appReducer;
