import axios from "axios";
import cookie from "react-cookie";
import { browserHistory } from "react-router";

import { SHOW_ERROR } from "../appActions";

export const FETCH_SESSION = "fetchSession";
export const CREATE_SESSION = "createSession";
export const FINISH_SESSION = "finishSession";

const SESSIONS_API_URL = `/api/sessions`;

export const fetchSession = sessionId => dispatch => {
  const config = { headers: { Authorization: cookie.load("token") } };

  axios
    .get(`${SESSIONS_API_URL}/${sessionId}`, config)
    .then(response => {
      dispatch({
        type: FETCH_SESSION,
        payload: response.data,
      });
    })
    .catch(error => {
      dispatch({
        type: SHOW_ERROR,
        payload: error.response.data,
      });
    });
};

export const createSession = params => dispatch => {
  const config = { headers: { Authorization: cookie.load("token") } };

  axios
    .post("/api/sessions", params, config)
    .then(response => {
      dispatch({
        type: CREATE_SESSION,
        payload: response.data,
      });
      browserHistory.push(`/sessions/${response.data.session._id}`);
    })
    .catch(error => {
      dispatch({
        type: SHOW_ERROR,
        payload: error.response.data,
      });
    });
};

export const finishSession = sessionId => dispatch => {
  const config = { headers: { Authorization: cookie.load("token") } };
  const sessionUrl = `${SESSIONS_API_URL}/${sessionId}/finish`;

  axios
    .post(sessionUrl, {}, config)
    .then(response => {
      dispatch({
        type: FINISH_SESSION,
        payload: response.data,
      });
    })
    .catch(error => {
      dispatch({
        type: SHOW_ERROR,
        payload: error.response.data,
      });
    });
};
