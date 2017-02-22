import sessionApi from '../api/SessionApi';
import axios from 'axios';
import cookie from 'react-cookie';

import { LOGIN_SUCCESS } from './types';
const LOGIN_URL = 'http://localhost:3000/users/login';
const CLIENT_ROOT_URL = 'http://localhost:3000';

export function loginSuccess() {
	return { type: LOGIN_SUCCESS };
}

export function loginUser(email, password) {
	return function (dispatch) {
		axios.post(LOGIN_URL, { email, password })
		.then((response) => {
			cookie.save('token', response.data.token, { path: '/' });
			cookie.save('user', response.data.user, { path: '/' });
			dispatch(loginSuccess());
			window.location.href = CLIENT_ROOT_URL;
		})
		.catch((error) => {
			throw(error);
		});
	};
}
