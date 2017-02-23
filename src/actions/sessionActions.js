import axios from 'axios';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
import { AUTH_USER, FETCH_SELF } from './types';

const CLIENT_ROOT_URL = 'http://localhost:3000';
const LOGIN_URL = `${CLIENT_ROOT_URL}/users/login`;
const SELF_URL = `${CLIENT_ROOT_URL}/self`;

export function loginUser(email, password) {
	return function (dispatch) {
		axios.post(LOGIN_URL, { email, password })
		.then((response) => {
			cookie.save('token', response.data.token, { path: '/' });
			cookie.save('user', response.data.user, { path: '/' });
			dispatch({
				type: AUTH_USER,
				payload: response.data,
			});
			browserHistory.push('/home');
		})
		.catch((error) => {
			throw(error);
		});
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
