import axios from "axios";
import cookie from "react-cookie";
import { browserHistory } from "react-router";

export const fetchSession = sessionId => dispatch => {
  const config = { headers: { Authorization: cookie.load("token") } };

  dispatch({
    type: "FETCH_SESSION_REQUEST",
    session: sessionId,
  });

  return axios.get(`/api/sessions/${sessionId}`, config).then(
    response => {
      dispatch({
        type: "FETCH_SESSION_SUCCESS",
        payload: response.data,
      });
    },
    error => {
      dispatch({
        type: "FETCH_SESSION_FAILURE",
        message: error.response || "Something went wrong.",
      });
    },
  );
};

export const createSession = params => dispatch => {
  const config = { headers: { Authorization: cookie.load("token") } };

  dispatch({
    type: "CREATE_SESSION_REQUEST",
    params,
  });

  return axios.post("/api/sessions", params, config).then(
    response => {
      dispatch({
        type: "CREATE_SESSION_SUCCESS",
        payload: response.data,
      });
      browserHistory.push(`/sessions/${response.data.session._id}`);
    },
    error => {
      dispatch({
        type: "CREATE_SESSION_FAILURE",
        message: error.response || "Something went wrong.",
      });
    },
  );
};
