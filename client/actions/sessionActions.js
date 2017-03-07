import axios from 'axios';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER } from './types';

const CLIENT_ROOT_URL = 'http://localhost:3000';
const LOGIN_URL = `${CLIENT_ROOT_URL}/users/login`;
const SIGNUP_URL = `${CLIENT_ROOT_URL}/users/signup`;
const SELF_URL = `${CLIENT_ROOT_URL}/self`;

export function loginUser(params) {
	return function (dispatch) {
		axios.post(LOGIN_URL, params)
		.then((response) => {
			cookie.save('token', response.data.token, { path: '/' });
			cookie.save('user', response.data.user, { path: '/' });
			dispatch({
				type: AUTH_USER,
				payload: response.data,
			});
		})
		.catch((error) => {
			throw(error);
		});
	};
}

export function signupUser(params) {
	return function (dispatch) {
		axios.post(SIGNUP_URL, params)
		.then((response) => {
			cookie.save('token', response.data.token, { path: '/' });
			cookie.save('user', response.data.user, { path: '/' });
			dispatch({
				type: AUTH_USER,
				payload: response.data,
			});
		})
		.catch((error) => {
			throw(error);
		});
	};
}

export function logoutUser(error) {
	return function (dispatch) {
		dispatch({ type: UNAUTH_USER, payload: error || '' });
		cookie.remove('token', { path: '/' });
		cookie.remove('user', { path: '/' });
		window.location.href = CLIENT_ROOT_URL;
	};
}

export function fetchSelf(token) {
	return function (dispatch) {
		axios.get(SELF_URL, { token })
		.then((response) => {
			dispatch({
				type: FETCH_SELF,
				payload: response.data,
			});
		})
		.catch((error) => {
			throw(error);
		});
	};
}
