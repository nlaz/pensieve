import { combineReducers } from 'redux';
import authReducer from './authReducer';

const appReducer = combineReducers({
	app: authReducer,
});

export default appReducer;
