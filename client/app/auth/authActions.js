import axios from "axios";
import cookie from "react-cookie";

import { SHOW_ERROR } from "../appActions";

export const AUTH_USER = "authUser";
export const AUTH_ERROR = "authUserError";
export const UNAUTH_USER = "unauthUser";

const LOGIN_URL = "/users/login";
const SIGNUP_URL = "/users/signup";

export const loginUser = params => dispatch => {
  axios
    .post(LOGIN_URL, params)
    .then(response => {
      cookie.save("token", response.data.token, { path: "/" });
      cookie.save("user", response.data.user, { path: "/" });
      dispatch({
        type: AUTH_USER,
        payload: response.data,
      });
    })
    .catch(error => {
      dispatch({
        type: SHOW_ERROR,
        payload: {
          error: error.response.data.error,
          message: "Unable to log in. Are you even using the right email?",
        },
      });
    });
};

export const signupUser = params => dispatch => {
  axios
    .post(SIGNUP_URL, params)
    .then(response => {
      cookie.save("token", response.data.token, { path: "/" });
      cookie.save("user", response.data.user, { path: "/" });
      dispatch({
        type: AUTH_USER,
        payload: response.data,
      });
    })
    .catch(error => {
      dispatch({
        type: SHOW_ERROR,
        payload: {
          error: error.response.data.error,
          message: "Uh oh! Unable to sign up. What did you do to make this happen?",
        },
      });
    });
};

export const logoutUser = error => dispatch => {
  dispatch({ type: UNAUTH_USER, payload: error || "" });
  cookie.remove("token", { path: "/" });
  cookie.remove("user", { path: "/" });
};
