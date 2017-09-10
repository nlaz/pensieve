import axios from 'axios';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';

export const FETCH_SESSIONS = 'fetchSessions';
export const FETCH_SESSION = 'fetchSession';
export const CREATE_SESSION = 'createSession';
export const FINISH_SESSION = 'finishSession';
export const SESSION_ERROR = 'sessionError';

const SESSIONS_API_URL = `/api/sessions`;

export function fetchSessions() {
  return function(dispatch) {
    axios
      .get(SESSIONS_API_URL, {
        headers: { Authorization: cookie.load('token') }
      })
      .then(response => {
        dispatch({
          type: FETCH_SESSIONS,
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: SESSION_ERROR,
          payload: error.response.data
        });
      });
  };
}

export function fetchSession(sessionId) {
  return function(dispatch) {
    axios
      .get(`${SESSIONS_API_URL}/${sessionId}`, {
        headers: { Authorization: cookie.load('token') }
      })
      .then(response => {
        dispatch({
          type: FETCH_SESSION,
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: SESSION_ERROR,
          payload: error.response.data
        });
      });
  };
}

export function createSession() {
  const config = { headers: { Authorization: cookie.load('token') } };

  return function(dispatch) {
    axios
      .post('/api/sessions', {}, config)
      .then(response => {
        dispatch({
          type: CREATE_SESSION,
          payload: response.data
        });
        browserHistory.push(`/sessions/${response.data.session._id}`);
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: SESSION_ERROR,
          payload: error.response.data
        });
      });
  };
}

export function finishSession(sessionId) {
  const config = { headers: { Authorization: cookie.load('token') } };
  const sessionUrl = `${SESSIONS_API_URL}/${sessionId}/finish`;

  return function(dispatch) {
    axios
      .post(sessionUrl, {}, config)
      .then(response => {
        dispatch({
          type: FINISH_SESSION,
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: SESSION_ERROR,
          payload: error.response.data
        });
      });
  };
}
