import axios from "axios";
import cookie from "react-cookie";
import { browserHistory } from "react-router";

export const loginUser = params => dispatch => {
  dispatch({ type: "AUTH_USER_REQUEST" });

  return axios.post("/users/login", params).then(
    response => {
      cookie.save("token", response.data.token, { path: "/" });
      cookie.save("user", response.data.user, { path: "/" });

      dispatch({
        type: "AUTH_USER_SUCCESS",
        payload: response.data,
      });
    },
    error => {
      dispatch({
        type: "AUTH_USER_FAILURE",
        message: error.response || "Something went wrong.",
      });
    },
  );
};

export const signupUser = params => dispatch => {
  dispatch({ type: "AUTH_USER_REQUEST" });

  return axios.post("/users/signup", params).then(
    response => {
      cookie.save("token", response.data.token, { path: "/" });
      cookie.save("user", response.data.user, { path: "/" });

      dispatch({
        type: "AUTH_USER_SUCCESS",
        payload: response.data,
      });
    },
    error => {
      dispatch({
        type: "AUTH_USER_FAILURE",
        message: error.response || "Something went wrong.",
      });
    },
  );
};

export const logoutUser = () => dispatch => {
  cookie.remove("token", { path: "/" });
  cookie.remove("user", { path: "/" });

  dispatch({ type: "LOGOUT_USER" });

  browserHistory.push("/");
};
