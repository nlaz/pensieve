import axios from 'axios';
import { browserHistory } from 'react-router';
import { CREATE_SESSION, FETCH_SESSIONS, FETCH_SESSION } from './types';
import cookie from 'react-cookie';

const CLIENT_ROOT_URL = 'http://localhost:3000';
const SESSIONS_API_URL = `${CLIENT_ROOT_URL}/api/sessions`;

export function fetchSessions() {
	return function (dispatch) {
		axios.get(SESSIONS_API_URL, {
			headers: { Authorization: cookie.load('token') }
		})
		.then((response) => {
			dispatch({
				type: FETCH_SESSIONS,
				payload: response.data,
			});
		})
		.catch((error) => {
			console.error('Error', error);
		});
	};
}


export function fetchSession(sessionId) {
	return function (dispatch) {
		axios.get(`${SESSIONS_API_URL}/${sessionId}`, {
			headers: { Authorization: cookie.load('token') }
		})
		.then((response) => {
			dispatch({
				type: FETCH_SESSION,
				payload: response.data,
			});
		})
		.catch((error) => {
			console.error('Error', error);
		});
	};
}

export function createSession() {
	const config = { headers: { Authorization: cookie.load('token') }};

	return function (dispatch) {
		axios.post(SESSIONS_API_URL, {}, config)
		.then((response) => {
			dispatch({
				type: CREATE_SESSION,
				payload: response.data,
			});
			browserHistory.push(`/sessions/${response.data.session._id}`);
		})
		.catch((error) => {
			console.error('Error', error);
		});
	};
}

