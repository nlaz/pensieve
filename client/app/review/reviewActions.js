import axios from 'axios';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';

import { SHOW_ERROR } from '../appActions';

export const FETCH_SESSION = 'fetchSession';
export const CREATE_SESSION = 'createSession';
export const FINISH_SESSION = 'finishSession';
export const FETCH_SESSION_TYPES = 'fetchSessionTypes';

const SESSIONS_API_URL = `/api/sessions`;

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
          type: SHOW_ERROR,
          payload: error.response.data
        });
      });
  };
}

export const fetchSessionTypes = () => dispatch => {
  const config = { headers: { Authorization: cookie.load('token') } };

  axios
    .get('/api/session_types', config)
    .then(resp => dispatch({ type: FETCH_SESSION_TYPES, payload: resp.data }))
    .catch(error => dispatch({ type: SHOW_ERROR, payload: { error: error.response } }));
};

export function createSession(params) {
  const config = { headers: { Authorization: cookie.load('token') } };

  return function(dispatch) {
    axios
      .post('/api/sessions', params, config)
      .then(response => {
        dispatch({
          type: CREATE_SESSION,
          payload: response.data
        });
        browserHistory.push(`/sessions/${response.data.session._id}`);
      })
      .catch(error => {
        dispatch({
          type: SHOW_ERROR,
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
          type: SHOW_ERROR,
          payload: error.response.data
        });
      });
  };
}
