import { combineReducers } from 'redux';
import userReducer from './userReducer';
import authReducer from './authReducer';

const appReducer = combineReducers({
	userReducer,
	authReducer,
});

export default appReducer;
